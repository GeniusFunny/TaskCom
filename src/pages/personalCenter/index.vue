<template>
  <div class="personalCenter">
    <div class="personalCenter-menu">
      <img class="personalCenter-menu-icon" src="/static/images/menu.png"/>
    </div>
    <card :avatar="userInfo.avatar" :contend="userInfo.contend" :nickname="userInfo.nickName" :daily="userInfo.daily"/>
    <div class="personalCenter-task">
      <div class="personalCenter-task-tag">
        <img src="/static/images/task.png" />
        <span >当前任务</span>
      </div>
      <div v-for="task in taskList" :key="task.id">
        <task :taskName="task.taskName" :deadLine="task.deadLine" :taskNum="task.taskNum" :type="task.type" :finishedTaskNum="task.finishedTaskNum" :finishedPlayerNum="task.finishedPlayerNum"/>
      </div>
    </div>
  </div>
</template>

<script>
import card from '../../components/card'
import task from '../../components/task'
import {Test} from '../../api/API'

export default {
  components: {
    card,
    task
  },

  data () {
    return {
      userInfo: {},
      taskList: []
    }
  },
  methods: {
    parseInfo (data) {
      for (let key in data) {
        this.userInfo[key] = data[key]
      }
    },
    getUserInfo () {
      Test()
        .then(res => {
          this.parseInfo(res)
        })
    },
    getTaskList () {
      this.taskList = [
        {
          id: 1,
          taskName: 'OOP上机',
          type: 'daily',
          deadLine: '2018-5-14 17:00',
          taskNum: 3,
          finishedTaskNum: 1,
          finishedPlayerNum: 0
        },
        {
          id: 2,
          taskName: '数据库上机',
          type: 'daily',
          deadLine: '2018-5-14 22:00',
          taskNum: 9,
          finishedTaskNum: 5,
          finishedPlayerNum: 0
        },
        {
          id: 3,
          taskName: '软件工程大作业',
          type: 'multiPlayer',
          deadLine: '2018-5-16 22:00',
          taskNum: 9,
          finishedTaskNum: 5,
          finishedPlayerNum: 2
        },
        {
          id: 4,
          taskName: '互联网+',
          type: 'multiPlayer',
          deadLine: '2018-7-25 24:00',
          taskNum: 18,
          finishedTaskNum: 9,
          finishedPlayerNum: 5
        }
      ]
    }
  },
  created () {
    this.getUserInfo()
    this.getTaskList()
  }
}
</script>

<style lang="scss">
  @import '../../common/styles/pages/personalCenter';
</style>
