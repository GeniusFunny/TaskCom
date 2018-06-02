<template>
  <div class="task">
    <infoItem :name="info.title.name" :value="info.title.value"/>
    <infoItem :name="info.startTime.name" :value="info.startTime.value"/>
    <infoItem :name="info.endTime.name" :value="info.endTime.value"/>
    <taskList :taskList="info.TaskList"/>
    <avatarList v-if="info.isPublic" :avatarList="info.avatarList"/>
    <div v-if="info.share" class="tc-button" style="margin-left: -30rpx; position: fixed; bottom: 0" @click="joinTaskGroup">
      <img src="/static/images/button.png"/>
      <div class="tc-button-info">
        加入
      </div>
    </div>
  </div>
</template>

<script>
  import {showLoading, getStorage, hideLoading, toast, modal, jumpTo} from '../../utils/wxUtils'
  import {GetSimpleTaskInfo, JoinTaskGroup} from '../../api/API'
  import {normalizeTimeHours} from '../../utils/utils'
  import infoItem from '../../components/infoitem'
  import taskList from '../../components/simpleTaskList'
  import avatarList from '../../components/avatarList'

  export default {
    data () {
      return {
        info: {
          groupId: 1,
          isPublic: false,
          title: {
            name: '任务名称',
            value: ''
          },
          startTime: {
            name: '开始时间',
            value: ''
          },
          endTime: {
            name: '截止时间',
            value: ''
          },
          unfinishedTaskList: [],
          finishedTaskList: [],
          avatarList: []
        },
        share: false
      }
    },
    components: {
      infoItem,
      taskList,
      avatarList
    },
    methods: {
      loadTaskList () {
        showLoading()
        GetSimpleTaskInfo(this.info.groupId)
          .then(res => {
            hideLoading()
            this.info.endTime.value = normalizeTimeHours(res.data.summary.endTime)
            this.info.startTime.value = normalizeTimeHours(res.data.summary.startTime)
            this.info.title.value = res.data.summary.title
            this.info.TaskList = res.data.items
            this.info.isPublic = false
            if (typeof res.data.members !== 'undefined') {
              this.info.isPublic = true
              this.info.avatarList = res.data.members.map(item => ({
                ...item,
                username: item.username.length > 3 ? item.username.slice(0, 3) + '...' : item.username
              }))
            }
          })
          .catch(err => {
            console.log(err)
            hideLoading()
          })
      },
      joinTaskGroup () {
        JoinTaskGroup(this.info.groupId)
          .then(res => {
            console.log(res)
            toast('加入当前任务组')
            setTimeout(() => {
              jumpTo('../index/index')
            }, 1000)
          })
          .catch(err => {
            try {
              let code = err.data.code
              if (code === 1) {
                toast('人数已满', 'none')
              } else if (code === 2) {
                toast('任务组已经结束', 'none')
              } else if (code === 3) {
                toast('你已在当前任务组', 'none')
              }
              setTimeout(() => {
                jumpTo('../index/index')
              }, 1500)
            } catch (e) {
              console.log(e)
              modal('您尚未注册，是否前往注册？')
                .then(res => {
                  jumpTo('../index/index')
                })
            }
          })
      }
    },
    beforeMount () {
      this.info.groupId = getStorage('currentTaskId') || 0
      if (this.$root.$mp.query.hasOwnProperty('share')) {
        this.info.share = true
        this.info.groupId = this.$root.$mp.query.groupId
      }
      this.loadTaskList()
    }
  }
</script>

<style lang="scss">
  @import "../../common/styles/pages/task";
  @import "../../common/styles/components/button";
</style>
