<template>
  <div
    :id="id"
    class="tc-task"
    :class="[
      type === 'multiPlayer' ? 'tc-task-multiPlayer': ''
    ]"
    @click="clickTask"
  >
    <div class="tc-task-info-1">
      <div class="tc-task-info-1-name">{{taskName}}</div>
      <div class="tc-task-info-1-date">截止时间：{{deadLine}}</div>
      <div class="tc-task-info-1-participator">完成人数：{{finishedPlayerNum}}</div>
    </div>
    <div class="tc-task-info-2">
      {{finishedTaskNum}}/{{taskNum}}
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      taskName: {
        type: String,
        default: '默认任务'
      },
      deadLine: {
        type: String,
        default: '2018-5-14 22:00'
      },
      finishedTaskNum: {
        type: Number,
        default: 0
      },
      taskNum: {
        type: Number,
        default: 1
      },
      finishedPlayerNum: {
        type: Number,
        default: 0
      },
      type: {
        type: String,
        default: 'daily'
      },
      id: {
        type: Number
      }
    },
    methods: {
      clickTask (e) {
        this.$emit('task', e.currentTarget.id)
      }
    }
  }
</script>

<style lang="scss">
  @import "../common/styles/components/task";
</style>
