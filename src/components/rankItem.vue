<template>
  <div class="tc-rankItem-top3">
    <img class="tc-rankItem-top3-tag" :src="tagList[position]"/>
    <img class="tc-rankItem-top3-avatar" :src="avatar"/>
    <div class="tc-rankItem-top3-name">{{username}}</div>
    <div class="tc-rankItem-top3-score">{{score}}</div>
  </div>
</template>

<script>
  export default {
    props: {
      username: {
        type: String,
        default: '测试'
      },
      score: {
        type: Number,
        default: 100
      },
      position: {
        type: Number,
        default: 1
      },
      avatar: {
        type: String,
        default: '/static/images/avatar.jpeg'
      },
      tagList: {
        type: Object,
        default: {
          '1': '/static/images/1st.png',
          '2': '/static/images/2th.png',
          '3': '/static/images/3th.png'
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "../common/styles/components/rankItem";
</style>
