<template>
  <div class="personalCenter">
    <div class="personalCenter-menu">
      <img class="personalCenter-menu-icon" src="/static/images/menu.png"/>
    </div>
    <card :avatar="userInfo.avatar" :contend="userInfo.contend" :nickname="userInfo.nickname" :daily="userInfo.daily"/>
    <div class="personalCenter-task">
      <div class="personalCenter-task-tag">
        <img src="/static/images/task.png" />
        <span >当前任务</span>
      </div>
      <div v-for="task in taskList">
        <task :taskName="task.taskName" :deadLine="task.deadLine" :taskNum="task.taskNum" :type="task.type" :finishedTaskNum="task.finishedTaskNum" :finishedPlayerNum="task.finishedPlayerNum"/>
      </div>
    </div>
  </div>
</template>

<script>
import card from '../../components/card'
import task from '../../components/task'
import {getStorage} from '../../utils/wxUtils'
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
    getUserInfo () {
      this.userInfo['avatar'] = getStorage('wxAvatar') || 'http://5b0988e595225.cdn.sohucs.com/images/20170911/aa2247ad3e9345809e4bc1cb3c3f30fe.jpeg'
      this.userInfo['contend'] = 1988
      this.userInfo['daily'] = 2433
      this.userInfo['nickname'] = getStorage('Nickname') || 'chenchen'
    },
    getTaskList () {
      this.taskList = [
        {
          taskName: 'OOP上机',
          type: 'daily',
          deadLine: '2018-5-14 17:00',
          taskNum: 3,
          finishedTaskNum: 1,
          finishedPlayerNum: 0
        },
        {
          taskName: '数据库上机',
          type: 'daily',
          deadLine: '2018-5-14 22:00',
          taskNum: 9,
          finishedTaskNum: 5,
          finishedPlayerNum: 0
        },
        {
          taskName: '软件工程大作业',
          type: 'multiPlayer',
          deadLine: '2018-5-16 22:00',
          taskNum: 9,
          finishedTaskNum: 5,
          finishedPlayerNum: 2
        },
        {
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
