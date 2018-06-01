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
  import {unix2cst} from '../../utils/utils'
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
        console.log(data)
        console.log(data[0])
        console.log(unix2cst(data[0].endTime))
        let source = data.map(item => ({
          ...item,
          hasFinished: !(item.unfinishedDay > 0),
          endTime: unix2cst(item.endTime),
          type: item.type === 1 ? 'daily' : 'multiPlayer'
        }))
        console.log(source)
        return source
      },
      getTaskMoreInfo (key) {
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
