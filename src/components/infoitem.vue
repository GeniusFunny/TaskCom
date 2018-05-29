<template>
  <div class="tc-infoItem">
    <div>{{name}}</div>
    <div class="tc-infoItem-value">{{value}}</div>
  </div>
</template>

<script>
  export default {
    props: {
      name: {
        type: String,
        default: '截止时间'
      },
      value: {
        type: String,
        default: '2018-5-5'
      }
    }
  }
</script>

<style lang="scss">
  @import "../common/styles/components/infoItem";
</style>
