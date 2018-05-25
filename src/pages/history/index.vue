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
          GetHistory(this.page)
            .then(res => {
              this.page++
              this.pageSum = res.data.pageSum
              this.parseHistory(res.data.groups).forEach(item => {
                this.taskList.push(item)
              })
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
        console.log(key)
      }
    },
    onReachBottom () {
      console.log('上拉加载')
      this.getHistory()
    },
    beforeMount () {
      this.getHistory()
    }
  }
</script>

<style lang="scss">
  @import "../../common/styles/pages/history";
</style>
