<template>
  <div class="history">
    <div class="history-task">
      <div>
        <history v-for="task in taskList" :key="task.groupId" :taskName="task.title" :deadLine="task.endTime" :type="task.type"  :finishedPlayerNum="task.finishedPeople" :hasFinished="task.hasFinished" :id="task.groupId" @task="getTaskMoreInfo"/>
      </div>
    </div>
  </div>
</template>

<script>
  import { GetHistory } from '../../api/API'
  import history from '../../components/history'
  import {normalizeTime} from '../../utils/utils'
  import {showLoading, hideLoading, toast, setStorage, jumpTo} from '../../utils/wxUtils'

  export default {
    data () {
      return {
        taskList: [],
        page: 1
      }
    },
    components: {
      history
    },
    methods: {
      getHistory () {
        if (typeof this.pageSum === 'undefined' || this.page <= this.pageSum) {
          showLoading()
          GetHistory(this.page)
            .then(res => {
              hideLoading()
              this.page++
              this.pageSum = res.data.pageSum
              this.parseHistory(res.data.groups).forEach(item => {
                this.taskList.push(item)
              })
            })
            .catch(err => {
              hideLoading()
              toast(err)
            })
        }
      },
      parseHistory (data) {
        return data.map(item => {
          return {
            ...item,
            hasFinished: !(item.unfinishedDay > 0),
            endTime: normalizeTime(item.endTime),
            type: item.type === 1 ? 'daily' : 'multiPlayer'
          }
        })
      },
      getTaskMoreInfo (key) {
        setStorage('currentTaskId', parseInt(key))
        jumpTo(`../task/task`)
      }
    },
    onReachBottom () {
      this.getHistory()
    },
    onPullDownRefresh () {
      this.getHistory()
      setTimeout(() => {
        wx.stopPullDownRefresh()
      }, 1000)
    },
    beforeMount () {
      this.getHistory()
    }
  }
</script>

<style lang="scss">
  @import "../../common/styles/pages/history";
</style>
