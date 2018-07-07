<template>
  <div class="history">
    <div class="history-task">
      <div>
        <div v-if="taskList !== undefined && taskList.length === 0" style="color: #997625; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 28rpx;">
          小主，这里是空的。
        </div>
        <future
          v-for="(item, index) in taskList"
          :key="index"
          :taskName="item.title"
          :id="item.groupId"
          :startTime="item.startTime"
          :type="item.type"
          @task="getTaskMoreInfo"
          @submit="getFormId"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import { GetFutureTaskList, SubmitForm } from '../../api/API'
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
      },
      getFormId (formId) {
        console.log(formId)
        SubmitForm({formId: formId, type: 1})
      }
    },
    onPullDownRefresh () {
      this.getFutureTaskList()
      setTimeout(() => {
        wx.stopPullDownRefresh()
      }, 1000)
    },
    onLoad () {
      this.getFutureTaskList()
    }
  }
</script>

<style lang="scss">
  @import "../../common/styles/pages/history";
</style>
