<template>
  <div class="task">
    <infoItem :name="info.title.name" :value="info.title.value"/>
    <infoItem :name="info.date.name" :value="info.date.value"/>
    <taskList type="finished" :taskList="info.finishedTaskList"/>
    <taskList type="unfinished" :taskList="info.unfinishedTaskList" @changeTaskState="subTaskClick"/>
    <avatarList v-if="info.isPublic" :avatarList="info.avatarList"/>
  </div>
</template>

<script>
  import {showLoading, getStorage, hideLoading, modal} from '../../utils/wxUtils'
  import {GetTaskInfo, FinishTaskItem} from '../../api/API'
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
            name: '截止日期',
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
            this.info.unfinishedTaskList = res.data.unfinished
            this.info.date.value = normalizeTimeHours(res.data.summary.endTime)
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
