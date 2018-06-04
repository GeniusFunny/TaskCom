<template>
  <div>
    <div class="task" style="min-height: 87vh">
      <infoItem :name="info.title.name" :value="info.title.value"/>
      <infoItem :name="info.date.name" :value="info.date.value"/>
      <infoItem :name="info.time.name" :value="info.time.value"/>
      <taskList :taskList="info.TaskList"/>
      <avatarList v-if="info.isPublic" :avatarList="info.avatarList"/>
    </div>
    <div v-if="info.share !== undefined && info.share" class="tc-button" @click="joinTaskGroup">
      <img src="/static/images/button.png"/>
      <div class="tc-button-info">
        {{buttonContent || '加入'}}
      </div>
    </div>
    <div v-if="!info.share" class="tc-button" @click="clickShare" style="background-color: #ffc53d; min-height: 13vh;">
      <!--<img src="/static/images/button.png"/>-->
      <div class="tc-button-info">
        <!--分享-->
      </div>
    </div>
  </div>
</template>

<script>
  import {showLoading, getStorage, hideLoading, toast, modal, jumpTo} from '../../utils/wxUtils'
  import {GetSimpleTaskInfo, JoinTaskGroup} from '../../api/API'
  import {normalizeTimeHours} from '../../utils/utils'
  import infoItem from '../../components/infoitem'
  import taskList from '../../components/simpleTaskList'
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
          avatarList: []
        },
        hidden: true,
        share: false,
        buttonContent: '加入'
      }
    },
    components: {
      infoItem,
      taskList,
      avatarList
    },
    methods: {
      loadTaskList () {
        showLoading()
        GetSimpleTaskInfo(this.info.groupId)
          .then(res => {
            hideLoading()
            let endTime = normalizeTimeHours(res.data.summary.endTime).split(' ')
            let startTime = normalizeTimeHours(res.data.summary.startTime).split(' ')
            this.info.date.value = startTime[0] + ' ~ ' + endTime[0]
            this.info.time.value = startTime[1] + ' ~ ' + endTime[1]
            this.info.title.value = res.data.summary.title
            this.info.TaskList = res.data.items
            this.info.isPublic = false
            if (typeof res.data.members !== 'undefined') {
              this.info.isPublic = true
              this.info.avatarList = res.data.members.map(item => ({
                ...item,
                username: item.username.length > 3 ? item.username.slice(0, 3) + '...' : item.username
              }))
              if (this.info.avatarList.findIndex(item => item.userId === getStorage('userId')) !== -1) {
                this.buttonContent = '已加入'
              }
            }
          })
          .catch(err => {
            console.log(err)
            hideLoading()
            setTimeout(() => {
              toast('网络状况差，请重试')
            }, 1000)
          })
      },
      joinTaskGroup () {
        if (this.buttonContent === '已加入') {
          return 0
        }
        JoinTaskGroup(this.info.groupId)
          .then(res => {
            this.loadTaskList()
          })
          .catch(err => {
            try {
              let code = err.data.code
              if (code === 1) {
                toast('人数已满: )', 'none')
              } else if (code === 2) {
                toast('任务组已经结束: )', 'none')
              } else if (code === 3) {
                toast('你已在当前任务组: )', 'none')
              }
              if (!this.$root.$mp.query.hasOwnProperty('inApp')) {
                setTimeout(() => {
                  jumpTo('../index/index')
                }, 1500)
              }
            } catch (e) {
              modal('您尚未注册，是否前往注册？')
                .then(res => {
                  jumpTo('../index/index')
                })
            }
          })
      }
    },
    onLoad () {
      this.info.share = false
      this.info.groupId = getStorage('currentTaskId') || 0
      if (this.$root.$mp.query.hasOwnProperty('share')) {
        this.info.share = true
        this.info.groupId = this.$root.$mp.query.groupId
      }
      this.loadTaskList()
    },
    onUnload () {
      this.info.share = false
      this.buttonContent = '加入'
    }
  }
</script>

<style lang="scss">
  @import "../../common/styles/pages/task";
  @import "../../common/styles/components/button";
</style>
