<template>
  <form report-submit="true" @submit="submit" :id="id">
    <button formType="submit">
      <div
        class="tc-task"
        :class="[
      type === 'multiPlayer' ? 'tc-task-multiPlayer': ''
    ]"
      >
        <div class="tc-task-info-1">
          <div class="tc-task-info-1-name">{{taskName}}</div>
          <div class="tc-task-info-1-date">开始时间：{{startTime}}</div>
        </div>
      </div>
    </button>
  </form>
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
      submit (e) {
        this.$emit('task', e.currentTarget.id, e.target.formId)
      }
    }
  }
</script>

<style lang="scss">
  @import "../common/styles/components/task";
  @import "../common/styles/components/history";
  button {
    position: static;
    border: none;
    padding: 0;
    margin: 0;
    background-color: transparent;
    text-align: left;
  }
  button:after {
    content: none;
  }
</style>
