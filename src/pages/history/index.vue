<template>
  <div class="history">
    <div class="history-task">
      <div>
        <history v-for="task in taskList" :key="task.id" :taskName="task.taskName" :deadLine="task.deadLine" :type="task.type"  :finishedPlayerNum="task.finishedPlayerNum" :hasFinished="task.hasFinished" :id="task.id" @task="getTaskMoreInfo"/>
      </div>
    </div>
  </div>
</template>

<script>
  import { GetHistory } from '../../api/API'
  import history from '../../components/history'
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
        GetHistory(this.page)
          .then(res => {
            this.page++
            this.taskList.concat(res.data)
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
