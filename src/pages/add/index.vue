<template>
  <div>
    <div class="add">
      <tab :type="info.type" @changeTaskType="changeTaskType"/>
      <div>
        <tcInput :info="info.taskName" />
        <tcTextarea v-for="(item, index) in info.taskList" :info="item" :key="item.id" :index="index"/>
        <div class="add-addTaskItem">
          <img src="/static/images/addButton.png" @click="addSubTask" id="img"/>
        </div>
        <div class="add-addTaskItem-info">
          添加任务项，获得多倍积分<img class="add-addTaskItem-info-tag" src="/static/images/jifen.png"/>
        </div>
        <div class="add-info-margin"></div>
        <tcInput :info="info.days" />
      </div>
      <div v-if="info.type === 'multiplayer'">
        <tcInput :info="info.players" />
      </div>
    </div>
    <TcButton @buttonClick="createTask">创建任务</TcButton>
  </div>
</template>

<script>
  import tab from '../../components/tab'
  import tcInput from '../../components/input'
  import tcTextarea from '../../components/textarea'
  import tcButton from '../../components/button'
  import {toast} from '../../utils/wxUtils'

  export default {
    data () {
      return {
        info: {
          type: 'multiplayer',
          taskName: {
            name: '任务名称',
            type: 'input',
            value: '王小二'
          },
          days: {
            name: '任务坚持天数',
            type: 'picker',
            value: 2,
            data: [
              1, 2, 3, 4, 5, 6, 7
            ]
          },
          players: {
            name: '参与人数',
            type: 'picker',
            value: 2,
            data: [
              2, 3, 4, 5, 6, 7, 8
            ]
          },
          taskList: [
            {
              id: 1,
              value: '打麻将'
            }
          ]
        },
        taskInfo: {}
      }
    },
    components: {
      tab,
      tcInput,
      tcTextarea,
      tcButton
    },
    methods: {
      changeTaskType (type) {
        this.info.type = type
      },
      addSubTask (e) {
        console.log(e.target)
        this.info.taskList.push({
          id: this.info.taskList.length + 1,
          value: ''
        })
      },
      checkTaskName () {
        return this.info.name.length > 0
      },
      checkTaskInfo () {
        return this.info.taskList.every(item => {
          return item.value.length > 0
        })
      },
      getTaskInfo () {
        try {
          this.taskInfo = {
            name: this.info.taskName.name,
            days: this.info.days.data[this.info.days.value],
            taskList: this.info.taskList
          }
          if (this.info.type === 'multiplayer') {
            this.taskInfo.players = this.info.players.data[this.days.value]
          }
        } catch (e) {
          throw new Error('you空值')
        }
        return this
      },
      submitTask () {
        if (this.info.type === 'daily') {
          toast('提交单人任务')
        } else {
          toast('提交多人任务')
        }
        console.log(this.taskInfo)
      },
      createTask () {
        if (this.checkTaskName() && this.checkTaskInfo()) {
          this.getTaskInfo().submitTask()
        } else {
          toast('格式错误')
        }
      }
    }
  }
</script>

<style lang="scss">
  @import '../../common/styles/pages/add';
</style>
