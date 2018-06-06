<template>
  <div class="history">
    <div class="history-task">
      <div>
        <div v-if="taskList !== undefined && taskList.length === 0" style="color: #997625; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 28rpx;">小主，这里是空的。</div>
        <history v-for="task in taskList" :key="task.groupId" :taskName="task.title" :deadLine="task.endTime" :type="task.type"  :finishedPlayerNum="task.finishedPeople" :hasFinished="task.hasFinished" :id="task.groupId" @task="getTaskMoreInfo"/>
      </div>
    </div>
  </div>
</template>

<script>
  import { GetHistory, SubmitForm } from '../../api/API'
  import history from '../../components/history'
  import {normalizeTimeHours} from '../../utils/utils'
  import {showLoading, hideLoading, setStorage, jumpTo} from '../../utils/wxUtils'

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
              console.log(err)
            })
        }
      },
      parseHistory (data) {
        return data.map(item => ({
          ...item,
          hasFinished: !(item.unfinishedDay > 0),
          endTime: normalizeTimeHours(item.endTime),
          type: item.type === 1 ? 'daily' : 'multiPlayer'
        }))
      },
      getTaskMoreInfo (key, formId) {
        console.log(formId)
        SubmitForm({formId: formId, type: 1})
        setStorage('currentTaskId', parseInt(key))
        setStorage('state', 'history')
        jumpTo(`../simpleTask/simpleTask`)
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
    onLoad () {
      this.getHistory()
    }
  }
</script>

<style lang="scss">
  @import "../../common/styles/pages/history";
</style>
