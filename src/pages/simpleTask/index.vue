<template>
  <div>
    <div class="task" style="min-height: 87vh">
      <infoItem :name="info.title.name" :value="info.title.value"/>
      <infoItem :name="info.date.name" :value="info.date.value"/>
      <infoItem :name="info.time.name" :value="info.time.value"/>
      <taskList :taskList="info.TaskList"/>
      <avatarList v-if="info.isPublic" :avatarList="info.avatarList"/>
    </div>
    <div v-if="info.share !== undefined && info.share" class="tc-button">
      <formButton :button-content="buttonContent" @getFormId="getFormId" :active="canClick"/>
    </div>
  </div>
</template>
<script>
  import {showLoading, getStorage, hideLoading, toast, modal, jumpTo} from '../../utils/wxUtils'
  import {GetSimpleTaskInfo, JoinTaskGroup, SubmitForm} from '../../api/API'
  import {normalizeTimeHours} from '../../utils/utils'
  import infoItem from '../../components/infoitem'
  import taskList from '../../components/simpleTaskList'
  import avatarList from '../../components/avatarList'
  import formButton from '../../components/formButton'

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
          date: {
            name: '任务周期',
            value: ''
          },
          time: {
            name: '时间段',
            value: ''
          },
          unfinishedTaskList: [],
          finishedTaskList: [],
          avatarList: []
        },
        hidden: true,
        share: false,
        buttonContent: '加入',
        formId: '',
        hasJoined: false,
        fromShareAndHasJoined: false,
        canClick: true,
        hasClicked: false
      }
    },
    components: {
      infoItem,
      taskList,
      avatarList,
      formButton
    },
    methods: {
      loadTaskList () {
        showLoading()
        GetSimpleTaskInfo(this.info.groupId)
          .then(res => {
            hideLoading()
            let endTime = normalizeTimeHours(res.data.summary.endTime).split(' ')
            let startTime = normalizeTimeHours(res.data.summary.startTime).split(' ')
            this.info.date.value = startTime[0] + ' ~ ' + endTime[0]
            this.info.time.value = startTime[1] + ' ~ ' + endTime[1]
            this.info.title.value = res.data.summary.title
            this.info.TaskList = res.data.items
            this.info.isPublic = false
            if (typeof res.data.members !== 'undefined') {
              this.info.isPublic = true
              this.info.avatarList = res.data.members.map(item => ({
                ...item,
                username: item.username.length > 3 ? item.username.slice(0, 3) + '...' : item.username
              }))
              if (this.info.avatarList.findIndex(item => item.userId === getStorage('userId')) !== -1) {
                this.hasJoined = true
                this.buttonContent = '已加入'
              }
              if ((this.fromShareAndHasJoined && this.hasJoined) || this.share) {
                this.buttonContent = '返回个人中心'
              }
            }
          })
          .catch(err => {
            console.log(err)
            hideLoading()
            setTimeout(() => {
              toast('网络状况差', 'none')
            }, 1000)
          })
      },
      joinTaskGroup () {
        if (this.buttonContent === '已加入') {
          return 0
        } else if (this.buttonContent === '返回个人中心') {
          jumpTo('../personalCenter/personalCenter')
          return 0
        }
        this.hasClicked = true
        this.canClick = false
        JoinTaskGroup(this.info.groupId)
          .then(res => {
            this.canClick = true
            SubmitForm({groupId: this.info.groupId, formId: this.formId})
              .then(res => {
                console.log(res)
              })
              .catch((err) => {
                console.log(err)
                toast('消息通知失败', 'none')
              })
            this.loadTaskList()
          })
          .catch(err => {
            this.canClick = true
            let code = err.data.code
            if (code === 1) {
              toast('人数已满: )', 'none')
            } else if (code === 2) {
              toast('任务组已经结束: )', 'none')
            } else if (code === 3) {
              toast('你已在当前任务组: )', 'none')
            } else if (code === 4) {
              toast('单人任务: )', 'none')
            } else if (code === undefined) {
              modal('提示', '您尚未注册，是否前往注册？')
                .then(res => {
                  jumpTo('../index/index')
                })
            }
            if (!this.$root.$mp.query.hasOwnProperty('inApp')) {
              setTimeout(() => {
                console.log(123)
                jumpTo('../index/index')
              }, 1000)
            }
          })
      },
      getFormId (key) {
        this.formId = key
        this.joinTaskGroup()
      }
    },
    onLoad () {
      this.info.share = false
      this.info.groupId = getStorage('currentTaskId') || 0
      if (this.$root.$mp.query.hasOwnProperty('share')) {
        this.info.share = true
        this.hasClicked = false
        this.info.groupId = this.$root.$mp.query.groupId
      }
      if (this.$root.$mp.query.hasOwnProperty('hasJoined')) {
        this.fromShareAndHasJoined = true
      }
      this.loadTaskList()
    },
    onShareAppMessage (options) {
      if (this.hasJoined) {
        return {
          title: '一起来挑战吧',
          path: `/pages/simpleTask/simpleTask?groupId=${this.info.groupId}&share=true&hasJoined=true`
        }
      } else {
        return {
          title: '一起来挑战吧',
          path: `/pages/simpleTask/simpleTask?groupId=${this.info.groupId}&share=true`
        }
      }
    },
    onUnload () {
      this.share = false
      this.info.groupId = ''
      this.formId = ''
      this.buttonContent = '加入'
      this.hasJoined = false
      this.fromShareAndHasJoined = false
      this.canClick = true
    }
  }
</script>

<style lang="scss">
  @import "../../common/styles/pages/task";
  @import "../../common/styles/components/button";
</style>
