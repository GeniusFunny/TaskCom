<template>
  <div class="tc-avatarList">
    <div class="tc-avatarList-title">其他参与人员</div>
    <div class="tc-avatarList-body">
      <div class="tc-avatarList-body-item" v-for="(item, index) in avatarList" :key="index">
        <img  :src="item.avatar"/>
        <div class="tc-avatarList-body-item-name">{{item.username}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      avatarList: {
        type: Array,
        default: [
          {
            avatar: '/static/images/avatar.jpeg',
            username: 'aaa'
          },
          {
            avatar: '/static/images/avatar.jpeg',
            username: 'aaa'
          },
          {
            avatar: '/static/images/avatar.jpeg',
            username: 'aaa'
          }
        ]
      }
    }
  }
</script>

<style lang="scss">
  @import "../common/styles/components/avatarList";
</style>
