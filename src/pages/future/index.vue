<template>
  <div class="history">
    <div class="history-task">
      <div>
        <future
          v-for="(item, index) in taskList"
          :key="index"
          :taskName="item.title"
          :id="item.groupId"
          :startTime="item.startTime"
          :type="item.type"
          @task="getTaskMoreInfo"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import { GetFutureTaskList } from '../../api/API'
  import future from '../../components/future'
  import {normalizeTimeHours} from '../../utils/utils'
  import {setStorage, jumpTo} from '../../utils/wxUtils'

  export default {
    data () {
      return {
        taskList: []
      }
    },
    components: {
      future
    },
    methods: {
      getFutureTaskList () {
        GetFutureTaskList()
          .then(res => {
            this.taskList = this.parseTaskList(res.data.tasks)
          })
      },
      parseTaskList (data) {
        return data.map(item => ({
          ...item,
          startTime: normalizeTimeHours(item.startTime),
          type: item.type === 1 ? 'daily' : 'multiPlayer'
        }))
      },
      getTaskMoreInfo (key) {
        setStorage('currentTaskId', parseInt(key))
        setStorage('state', 'future')
        jumpTo(`../simpleTask/simpleTask`)
      }
    },
    onPullDownRefresh () {
      this.getFutureTaskList()
      setTimeout(() => {
        wx.stopPullDownRefresh()
      }, 1000)
    },
    beforeMount () {
      this.getFutureTaskList()
    }
  }
</script>

<style lang="scss">
  @import "../../common/styles/pages/history";
</style>
