<template>
  <div>
    <div
      class="task"
      :class="[
        !fromMessage? 'task-fullScreen': ''
      ]"
    >
      <infoItem :name="info.title.name" :value="info.title.value"/>
      <infoItem :name="info.date.name" :value="info.date.value"/>
      <infoItem :name="info.time.name" :value="info.time.value"/>
      <taskList type="finished" :taskList="info.finishedTaskList"/>
      <taskList type="unfinished" :taskList="info.unfinishedTaskList" @changeTaskState="subTaskClick"/>
      <avatarList
        v-if="info.isPublic"
        :avatarList="info.avatarList"
        @changeUserTaskInfo="changeCurrentUserTaskInfo"
        :currentUser="info.currentUser"
      />
    </div>
    <div style="height: 102rpx;" v-if="fromMessage">
      <button
        @click="jumpToPersonalCenter"
      >
        返回个人中心
      </button>
    </div>
  </div>
</template>

<script>
  import {showLoading, getStorage, hideLoading, modal, toast, jumpTo} from '../../utils/wxUtils'
  import {GetTaskInfo, FinishTaskItem, GetOthersTaskInfo} from '../../api/API'
  import {normalizeTimeHours} from '../../utils/utils'
  import infoItem from '../../components/infoitem'
  import taskList from '../../components/taskList'
  import avatarList from '../../components/avatarList'

  export default {
    data () {
      return {
        info: {
          groupId: 1,
          isPublic: false,
          title: {
            name: '任务名称',
            value: ''
          },
          date: {
            name: '任务周期',
            value: ''
          },
          time: {
            name: '时间段',
            value: ''
          },
          unfinishedTaskList: [],
          finishedTaskList: [],
          avatarList: [],
          currentUser: getStorage('userId') || 0
        },
        buttonContent: '返回个人中心',
        fromMessage: false
      }
    },
    components: {
      infoItem,
      taskList,
      avatarList
    },
    methods: {
      subTaskClick (key) {
        if (getStorage('state') === 'now') {
          this.subTaskSubmit(key)
        }
      },
      subTaskSubmit (key) {
        if (this.info.currentUser === getStorage('userId')) {
          modal('是否将当前任务标记为完成')
            .then(res => {
              this.subTaskChange(key)
            })
        }
      },
      subTaskChange (key) {
        showLoading()
        FinishTaskItem({groupId: this.info.groupId, itemId: key})
          .then(() => {
            hideLoading()
            this.loadTaskList()
          })
          .catch((err) => {
            hideLoading()
            if (err.data.code === 5 || err.data.code === 2) {
              setTimeout(() => {
                toast('已过截止时间: )', 'none')
              }, 600)
            } else {
              setTimeout(() => {
                toast('服务器崩溃: )', 'none')
              }, 600)
            }
          })
      },
      loadTaskList () {
        showLoading()
        GetTaskInfo(this.info.groupId)
          .then(res => {
            hideLoading()
            let endTime = normalizeTimeHours(res.data.summary.endTime).split(' ')
            let startTime = normalizeTimeHours(res.data.summary.startTime).split(' ')
            this.info.unfinishedTaskList = res.data.unfinished
            this.info.date.value = startTime[0] + ' ~ ' + endTime[0]
            this.info.time.value = startTime[1] + ' ~ ' + endTime[1]
            this.info.title.value = res.data.summary.title
            this.info.finishedTaskList = res.data.finished
            this.info.isPublic = false
            if (typeof res.data.members !== 'undefined') {
              this.info.isPublic = true
              this.info.avatarList = res.data.members.map(item => ({
                ...item,
                username: item.username.length > 3 ? item.username.slice(0, 3) + '...' : item.username
              }))
            }
          })
          .catch(err => {
            console.log(err)
            hideLoading()
          })
      },
      changeCurrentUserTaskInfo (key) {
        showLoading()
        GetOthersTaskInfo([this.info.groupId, key])
          .then(res => {
            this.info.currentUser = key
            this.info.finishedTaskList = res.data.finished
            this.info.unfinishedTaskList = res.data.unfinished
            hideLoading()
          })
      },
      jumpToPersonalCenter () {
        jumpTo('../personalCenter/personalCenter')
      }
    },
    onLoad () {
      this.info.groupId = getStorage('currentTaskId') || 0
      if (this.$root.$mp.query.hasOwnProperty('share')) {
        this.share = true
        this.info.groupId = this.$root.$mp.query.groupId
      } else if (this.$root.$mp.query.hasOwnProperty('groupId')) {
        this.info.groupId = this.$root.$mp.query.groupId
      }
      if (this.$root.$mp.query.hasOwnProperty('from')) {
        this.fromMessage = true
      }
      this.loadTaskList()
    },
    onShareAppMessage (options) {
      return {
        title: '一起来挑战吧',
        path: `/pages/simpleTask/simpleTask?groupId=${this.info.groupId}&share=true&hasJoined=true`
      }
    },
    onUnload () {
      this.info.currentUser = getStorage('userId')
      this.fromMessage = false
    }
  }
</script>

<style lang="scss">
  @import "../../common/styles/pages/task";
  button {
    margin-top: 15rpx;
    @include config_width_height(600rpx, 88rpx);
    margin-bottom: 15rpx;
    box-shadow: 0 3px 5px 2px rgba(255, 197, 102, .30);
    background: linear-gradient(45deg, $themeColor 30%, #fce01e 90%);
    border-radius: 50rpx;
    @include config_font(32rpx, $problemFontColor);
  }
</style>
