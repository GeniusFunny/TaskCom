<template>
  <div class="tc-historyScore-item">
    <div class="tc-historyScore-item-tag">
      <img :src="info.sponsorAvatar"/>
    </div>
    <div class="tc-historyScore-item-content">
      <div class="tc-historyScore-item-content-title">{{info.title}}</div>
      <div class="tc-historyScore-item-content-time">{{info.time}}</div>
    </div>
    <div class="tc-historyScore-item-score">
      +{{info.score}}
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      info: {
        type: Object,
        default: {
          sponsorAvatar: '/static/images/avatar.jpeg',
          title: '这是测试测试测试',
          score: 100,
          time: '2018-08-08'
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "../common/styles/components/scoreHistoryItem";
</style>
