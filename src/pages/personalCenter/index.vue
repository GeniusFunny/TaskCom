<template>
  <div class="personalCenter">
    <side-bar :avatar="userInfo.avatar" :menu-list="menuList" :nickName="userInfo.nickName" :hidden="sideBarVisible" @changeSideBar="changeSideBarVisible" @clickMenuItem="clickMenuItem"/>
    <div class="personalCenter-menu">
      <img class="personalCenter-menu-icon" src="/static/images/menu.png" @click="changeSideBarVisible"/>
    </div>
    <card :avatar="userInfo.avatar" :contend="userInfo.contend" :nickName="userInfo.nickName" :daily="userInfo.daily"/>
    <div class="personalCenter-task">
      <div class="personalCenter-task-tag">
        <img src="/static/images/task.png" />
        <span >当前任务</span>
      </div>
      <div>
        <task v-for="task in taskList" :key="task.id" :taskName="task.taskName" :deadLine="task.deadLine" :taskNum="task.taskNum" :type="task.type" :finishedTaskNum="task.finishedTaskNum" :finishedPlayerNum="task.finishedPlayerNum" :id="task.id" @task="getTaskMoreInfo"/>
      </div>
    </div>
  </div>
</template>

<script>
import card from '../../components/card'
import task from '../../components/task'
import sideBar from '../../components/sideBar'
import {GetUserInfo, GetCurrentTask} from '../../api/API'
import {setStorage, jumpTo} from '../../utils/wxUtils'

export default {
  components: {
    card,
    task,
    sideBar
  },

  data () {
    return {
      userInfo: {},
      taskList: [],
      menuList: [
        {
          id: 'edit',
          name: '基本资料',
          tag: '/static/images/edit.png'
        },
        {
          id: 'data',
          name: '数据展示',
          tag: '/static/images/data.png'
        },
        {
          id: 'history',
          name: '历史记录',
          tag: '/static/images/history.png'
        }
      ],
      sideBarVisible: true,
      menuUrl: {
        'edit': '../editInfo/editInfo'
      }
    }
  },
  methods: {
    parseInfo (data) {
      for (let key in data) {
        this.userInfo[key] = data[key]
      }
    },
    getUserInfo () {
      GetUserInfo()
        .then(res => {
          this.parseInfo(res)
        })
    },
    parseTaskList (data) {
      this.taskList = data
    },
    getTaskList () {
      GetCurrentTask()
        .then(res => {
          this.parseTaskList(res.data)
        })
    },
    getTaskMoreInfo (key) {
      setStorage('currentTaskId', parseInt(key))
      jumpTo('../task/task')
    },
    changeSideBarVisible () {
      this.sideBarVisible = !this.sideBarVisible
    },
    clickMenuItem (key) {
      jumpTo(this.menuUrl[key])
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
