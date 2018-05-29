<template>
  <div class="tc-taskList">
    <div class="tc-taskList-tag">
      <img
        :src="type === 'finished' ? '/static/images/finished_task.png': '/static/images/unfinished_task.png'"
      />
    </div>
    <div class="tc-taskList-body">
      <div class="tc-taskList-body-item" v-for="(item, index) in taskList" :key="index">
        <img
          class="tc-taskList-body-item-tag"
          :src="type === 'finished' ? '/static/images/ok.png': '/static/images/pending.png'"
        />
        <div class="tc-taskList-body-item-value">{{item.content}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      taskList: {
        type: Array,
        default: [
          {
            content: '跑步2小时'
          },
          {
            content: '工作5分钟'
          },
          {
            content: '疯狂睡觉'
          }
        ]
      },
      type: {
        type: String,
        default: 'finished'
      }
    }
  }
</script>

<style lang="scss">
  @import "../common/styles/components/taskList";
</style>
