<template>
  <div>
    <div class="add">
      <tab :type="info.type" @changeTaskType="changeTaskType"/>
      <div>
        <tcInput :info="info.taskName" @changeTaskName="changeTaskName"/>
        <tcTextarea v-for="(item, index) in info.taskList" :info="item" :key="item.id" :index="index" @changeTaskItemContent="changeTaskItemContent"/>
        <div class="add-addTaskItem">
          <img src="/static/images/addButton.png" @click="addSubTask" id="img"/>
        </div>
        <div class="add-addTaskItem-info">
          添加任务项，获得多倍积分<img class="add-addTaskItem-info-tag" src="/static/images/jifen.png"/>
        </div>
        <div class="add-info-margin"></div>
        <tcInput :info="info.startDate" @changeStartDate="changeStartDate"/>
        <tcInput :info="info.endDate" @changeEndDate="changeEndDate"/>
        <tcInput :info="info.startTime" @changeStartTime="changeStartTime"/>
        <tcInput :info="info.endTime" @changeEndTime="changeEndTime"/>
      </div>
      <div v-if="info.type === 'multiplayer'">
        <tcInput :info="info.players" @changePlayerNum="changePlayerNum"/>
        <tcInput :info="info.public" @changeIsPublic="changeIsPublic"/>
      </div>
    </div>
    <div class="tc-button" id="button" @click="createTask">
      <img src="/static/images/button.png"/>
      <div class="tc-button-info">
        创建任务
      </div>
    </div>
    <modal @shareTask="shareTask" :hidden="hidden"/>
  </div>
</template>

<script>
  import tab from '../../components/tab'
  import modal from '../../components/modal'
  import tcInput from '../../components/input'
  import tcTextarea from '../../components/textarea'
  import tcButton from '../../components/button'
  import {toast, jumpTo, showLoading, hideLoading} from '../../utils/wxUtils'
  import {unix2cst, cst2unix} from '../../utils/utils'
  import {CreateNewTask} from '../../api/API'

  export default {
    data () {
      return {
        info: {
          type: 'daily',
          taskName: {
            name: '任务名称',
            type: 'input',
            value: ''
          },
          startDate: {
            id: 'startDate',
            name: '任务开始日期',
            type: 'date',
            value: '',
            start: '',
            end: ''
          },
          endDate: {
            id: 'endDate',
            name: '任务结束日期',
            type: 'date',
            value: '',
            start: '',
            end: ''
          },
          startTime: {
            id: 'startTime',
            name: '每日开始时间',
            type: 'time',
            value: '',
            start: '',
            end: ''
          },
          endTime: {
            id: 'endTime',
            name: '每日结束时间',
            type: 'time',
            value: '',
            start: '',
            end: ''
          },
          players: {
            id: 'players',
            name: '最大参与人数',
            type: 'picker',
            value: 2,
            data: [
              2, 3, 4, 5, 6, 7, 8
            ]
          },
          taskList: [
            {
              id: 1,
              value: ''
            }
          ],
          public: {
            id: 'isPublic',
            name: '是否公开',
            type: 'picker',
            value: 1,
            data: [
              '否', '是'
            ]
          }
        },
        taskInfo: {},
        hidden: true,
        groupId: 66366
      }
    },
    components: {
      tab,
      tcInput,
      tcTextarea,
      tcButton,
      modal
    },
    methods: {
      changeTaskType (type) {
        this.info.type = type
      },
      addSubTask (e) {
        this.info.taskList.push({
          id: this.info.taskList.length + 1,
          value: ''
        })
      },
      checkTaskName () {
        return this.info.taskName.value.length > 0
      },
      checkTaskInfo () {
        if (this.info.taskList.length === 0) {
          return false
        }
        return this.info.taskList.every(item => {
          return item.value.length > 0
        })
      },
      getTaskInfo () {
        console.log(this.info.endDate.value + ' ' + this.info.startTime.value + ':00')
        try {
          this.taskInfo = {
            title: this.info.taskName.value,
            startTime: cst2unix(this.info.startDate.value + ' ' + this.info.startTime.value + ':00'),
            endTime: cst2unix(this.info.endDate.value + ' ' + this.info.endTime.value + ':00'),
            isPublic: !!this.info.public,
            maxPeople: this.info.players.data[this.info.players.value],
            items: this.info.taskList.map(item => {
              return {
                content: item.value
              }
            }),
            type: 1
          }
          if (this.info.type === 'multiplayer') {
            this.taskInfo.maxPeople = this.info.players.data[this.info.players.value]
            this.taskInfo.type = 0
          }
        } catch (e) {
          throw new Error('有空值')
        }
        return this
      },
      clearTask () {
        let data = this.info
        this.taskInfo = {}
        data.taskName.value = ''
        data.taskList = []
      },
      submitTask () {
        console.log('提交任务')
        console.log(this.taskInfo)
        CreateNewTask(this.taskInfo)
          .then(res => {
            this.hidden = false
            this.groupId = res.data.groupId
          })
          .catch(err => {
            toast('提交任务失败，请设置时间', 'none')
            console.error(err)
          })
      },
      createTask () {
        if (this.checkTaskName() && this.checkTaskInfo()) {
          this.getTaskInfo().submitTask()
        } else {
          toast('请填写相关信息', 'none')
        }
      },
      shareTask (key) {
        if (key !== 'share') {
          this.clearTask()
          this.hidden = true
          jumpTo('../personalCenter/personalCenter')
        }
      },
      initDate () {
        this.info.startDate.value = '请设置'
        this.info.startDate.start = unix2cst(Date.now())
        this.info.startDate.end = unix2cst(Date.now() + 3600 * 1000 * 24 * 90)

        this.info.endDate.start = unix2cst(Date.now())
        this.info.endDate.value = '请设置'
        this.info.endDate.end = unix2cst(Date.now() + 3600 * 1000 * 24 * 90)
      },
      changeStartDate (value) {
        this.info.startDate.value = value
        this.info.endDate.value = value
        this.info.endDate.start = value
        this.info.endDate.end = unix2cst(cst2unix(value) + 3600 * 1000 * 24 * 90)
      },
      changeEndDate (value) {
        this.info.endDate.value = value
      },
      initTime () {
        this.info.startTime.value = '请设置'
        this.info.endTime.value = '请设置'
        this.info.startTime.end = '22:59'
        this.info.endTime.end = '22:59'
      },
      changeStartTime (value) {
        this.info.startTime.value = value
      },
      changeEndTime (value) {
        this.info.endTime.value = value
      },
      changeTaskName (value) {
        this.info.taskName.value = value
      },
      changeTaskItemContent (key, value) {
        let index = this.findTask(key)
        if (index !== -1) {
          this.info.taskList[index].value = value
        }
      },
      findTask (key) {
        let itemIndex = -1
        this.info.taskList.forEach((item, index) => {
          if (item.id === parseInt(key)) {
            itemIndex = index
          }
        })
        return itemIndex
      },
      changeIsPublic (value) {
        this.info.public.value = value
      },
      changePlayerNum (value) {
        this.info.players.value = value
      },
      shareToContacts (key) {
        console.log(key)
      }
    },
    onShareAppMessage (options) {
      return {
        title: '一起来挑战吧',
        path: `/pages/simpleTask/simpleTask?groupId=${this.groupId}&share=true`
      }
    },
    beforeMount () {
      this.initDate()
      this.initTime()
    },
    onShow () {
      showLoading()
      setTimeout(() => {
        hideLoading()
      }, 1000)
    }
  }
</script>

<style lang="scss">
  @import '../../common/styles/pages/add';
  @import '../../common/styles/components/button';
</style>
