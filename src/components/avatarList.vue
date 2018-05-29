<template>
  <div class="tc-avatarList">
    <div class="tc-avatarList-title">参与人员</div>
    <div class="tc-avatarList-body">
      <div class="tc-avatarList-body-item" v-for="(item, index) in avatarList" :key="index">
        <img  :src="item.avatar"/>
        <div class="tc-avatarList-body-item-name">{{item.name}}</div>
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
            name: 'aaa'
          },
          {
            avatar: '/static/images/avatar.jpeg',
            name: 'aaa'
          },
          {
            avatar: '/static/images/avatar.jpeg',
            name: 'aaa'
          },
          {
            avatar: '/static/images/avatar.jpeg',
            name: 'aaa'
          },
          {
            avatar: '/static/images/avatar.jpeg',
            name: 'aaa'
          },
          {
            avatar: '/static/images/avatar.jpeg',
            name: 'aaa'
          },
          {
            avatar: '/static/images/avatar.jpeg',
            name: 'aaa'
          },
          {
            avatar: '/static/images/avatar.jpeg',
            name: 'aaa'
          },
          {
            avatar: '/static/images/avatar.jpeg',
            name: 'aaa'
          }
        ]
      }
    }
  }
</script>

<style lang="scss">
  @import "../common/styles/components/avatarList";
</style>
