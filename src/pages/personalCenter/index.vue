<template>
  <div class="personalCenter">
    <side-bar :avatar="userInfo.avatar" :menu-list="menuList" :nickName="userInfo.username" :hidden="sideBarVisible" @changeSideBar="changeSideBarVisible" @clickMenuItem="clickMenuItem"/>
    <div class="personalCenter-menu">
      <img class="personalCenter-menu-icon" src="/static/images/menu.png" @click="changeSideBarVisible"/>
    </div>
    <card :avatar="userInfo.avatar" :contend="userInfo.contend" :nickName="userInfo.username" :daily="userInfo.daily"/>
    <div class="personalCenter-task">
      <div class="personalCenter-task-tag">
        <img src="/static/images/task.png" />
        <span >当前任务</span>
      </div>
      <div>
        <task v-for="task in taskList" :key="task.id" :taskName="task.title" :deadLine="task.endTime" :taskNum="task.totalTask" :type="task.type" :finishedTaskNum="task.finishedTask" :finishedPlayerNum="task.finishedPeople" :id="task.groupId" @task="getTaskMoreInfo"/>
      </div>
    </div>
  </div>
</template>

<script>
import card from '../../components/card'
import task from '../../components/task'
import sideBar from '../../components/sideBar'
import {GetUserInfo, GetCurrentTask, GetScore} from '../../api/API'
import {setStorage, jumpTo, showLoading, hideLoading, toast} from '../../utils/wxUtils'
import {normalizeTimeHours} from '../../utils/utils'

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
        'edit': '../editInfo/editInfo',
        'history': '../history/history'
      }
    }
  },
  methods: {
    parseInfo (data) {
      for (let key in data) {
        this.userInfo[key] = data[key]
      }
    },
    parseScore (data) {
      this.userInfo.daily = data.personScore || 0
      this.userInfo.contend = data.peopleScore || 0
    },
    parseTaskList (data) {
      data.forEach(item => {
        item.endTime = normalizeTimeHours(item.endTime)
        item.type = item.type === 0 ? 'multiPlayer' : 'daily'
      })
      this.taskList = data
    },
    getTaskList () {
      GetCurrentTask()
        .then(res => {
          this.parseTaskList(res.data.groups)
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
  beforeMount () {
    showLoading()
    GetUserInfo()
      .then(res => {
        this.parseInfo(res.data.info)
        return GetScore()
      })
      .then(res => {
        this.parseScore(res.data.score)
        return GetCurrentTask()
      })
      .then(res => {
        this.parseTaskList(res.data.groups)
        hideLoading()
      })
      .catch(err => {
        hideLoading()
        toast(err)
      })
  },
  onPullDownRefresh () {
    GetScore()
      .then(res => {
        this.parseScore(res.data.score)
        return GetCurrentTask()
      })
      .then(res => {
        this.parseTaskList(res.data.groups)
        wx.stopPullDownRefresh()
      })
      .catch(err => {
        wx.stopPullDownRefresh()
        toast(err)
      })
  }
}
</script>

<style lang="scss">
  @import '../../common/styles/pages/personalCenter';
</style>
