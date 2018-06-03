<template>
  <div class="task">
    <infoItem :name="info.title.name" :value="info.title.value"/>
    <infoItem :name="info.date.name" :value="info.date.value"/>
    <infoItem :name="info.time.name" :value="info.time.value"/>
    <taskList type="finished" :taskList="info.finishedTaskList"/>
    <taskList type="unfinished" :taskList="info.unfinishedTaskList" @changeTaskState="subTaskClick"/>
    <avatarList
      v-if="info.isPublic"
      :avatarList="info.avatarList"
      @changeUserTaskInfo="changeCurrentUserTaskInfo"
    />
  </div>
</template>

<script>
  import {showLoading, getStorage, hideLoading, modal} from '../../utils/wxUtils'
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
          avatarList: []
        }
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
        modal('是否将当前任务标记为完成')
          .then(res => {
            this.subTaskChange(key)
          })
      },
      subTaskChange (key) {
        showLoading()
        FinishTaskItem({groupId: this.info.groupId, itemId: key})
          .then(() => {
            hideLoading()
            this.loadTaskList()
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
            this.info.finishedTaskList = res.data.finished
            this.info.unfinishedTaskList = res.data.unfinished
            hideLoading()
          })
      }
    },
    beforeMount () {
      this.info.groupId = getStorage('currentTaskId') || 0
      if (this.$root.$mp.query.hasOwnProperty('share')) {
        this.share = true
        this.info.groupId = this.$root.$mp.query.groupId
      }
      this.loadTaskList()
    }
  }
</script>

<style lang="scss">
  @import "../../common/styles/pages/task";
</style>
