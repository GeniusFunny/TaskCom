<template>
  <div class="task">
    <infoItem :name="info.title.name" :value="info.title.value"/>
    <infoItem :name="info.date.name" :value="info.date.value"/>
    <taskList :taskList="info.TaskList"/>
    <avatarList v-if="info.isPublic" :avatarList="info.avatarList"/>
  </div>
</template>

<script>
  import {showLoading, getStorage, hideLoading} from '../../utils/wxUtils'
  import {GetSimpleTaskInfo} from '../../api/API'
  import {unix2cst} from '../../utils/utils'
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
      loadTaskList () {
        showLoading()
        GetSimpleTaskInfo(this.info.groupId)
          .then(res => {
            hideLoading()
            this.info.date.value = unix2cst(res.data.summary.endTime)
            this.info.title.value = res.data.summary.title
            this.info.TaskList = res.data.items
            this.info.isPublic = false
            if (typeof res.data.members !== 'undefined') {
              this.info.isPublic = true
              this.avatarList = res.data.members
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
