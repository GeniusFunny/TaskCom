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
          <div class="tc-task-info-1-date">截止时间：{{deadLine}}</div>
          <div class="tc-task-info-1-participator">完成人数：{{finishedPlayerNum}}</div>
        </div>
        <div class="tc-task-info-2">
          <img class="history-img"
               :src="hasFinished ? tagUrl.finished: tagUrl.unfinished"
          />
        </div>
      </div>
    </button>
  </form>
</template>

<script>
  export default {
    data () {
      return {
        tagUrl: {
          unfinished: '/static/images/unfinished.png',
          finished: '/static/images/finished.png'
        }
      }
    },
    props: {
      taskName: {
        type: String,
        default: '默认任务'
      },
      deadLine: {
        type: String,
        default: '2018-5-14 22:00'
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
      },
      hasFinished: {
        type: Boolean,
        default: true
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
  @import "../common/styles/components/task";
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
