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
      <div class="tc-task-info-1-date">开始时间：{{startTime}}</div>
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
      startTime: {
        type: String,
        default: '2018-5-14 22:00'
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
  @import "../common/styles/components/history";
</style>
