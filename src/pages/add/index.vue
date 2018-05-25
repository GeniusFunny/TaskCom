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
  import {toast, jumpTo} from '../../utils/wxUtils'
  import {unix2utc, utc2unix} from '../../utils/utils'
  import {CreateNewTask} from '../../api/API'

  export default {
    data () {
      return {
        info: {
          type: 'multiplayer',
          taskName: {
            name: '任务名称',
            type: 'input',
            value: ''
          },
          startTime: {
            id: 'startTime',
            name: '任务开始时间',
            type: 'date',
            value: '',
            start: '',
            end: ''
          },
          endTime: {
            id: 'endTime',
            name: '任务结束时间',
            type: 'date',
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
        hidden: true
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
        return this.info.taskList.every(item => {
          return item.value.length > 0
        })
      },
      getTaskInfo () {
        try {
          this.taskInfo = {
            title: this.info.taskName.value,
            startTime: utc2unix(this.info.startTime.value),
            endTime: utc2unix(this.info.endTime.value),
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
      submitTask () {
        CreateNewTask(this.taskInfo)
          .then(res => {
            this.hidden = false
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
        if (key === 'close') {
          jumpTo('../personalCenter/personalCenter')
        }
      },
      initDate () {
        this.info.startTime.value = unix2utc(Date.now())
        this.info.startTime.start = unix2utc(Date.now())
        this.info.startTime.end = unix2utc(Date.now() + 3600 * 1000 * 24 * 90)

        this.info.value = unix2utc(Date.now())
        this.info.endTime.value = unix2utc(Date.now())
      },
      changeStartTime (value) {
        this.info.startTime.value = value
        this.info.endTime.value = value
        this.info.endTime.start = value
        this.info.endTime.end = unix2utc(utc2unix(value) + 3600 * 1000 * 24 * 90)
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
      }
    },
    beforeMount () {
      this.initDate()
    }
  }
</script>

<style lang="scss">
  @import '../../common/styles/pages/add';
  @import '../../common/styles/components/button';
</style>
