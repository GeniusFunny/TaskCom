<template>
  <div class="tc-taskList">
    <div class="tc-taskList-tag">
      <img src="/static/images/taskList.png"/>
    </div>
    <div class="tc-taskList-body">
      <div class="tc-taskList-body-item" v-for="(item, index) in taskList" :key="index">
        <img
          class="tc-taskList-body-item-tag"
          src="/static/images/pending.png"
          :id="item.itemId"
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
        type: Array
      }
    }
  }
</script>

<style lang="scss">
  @import "../common/styles/components/taskList";
</style>
