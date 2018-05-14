<template>
  <div
    class="tc-sideBar-container"
    @click="changeSideBarVisible"
    :class="[
      hidden? '': 'active'
    ]"
  >
    <div
      class="tc-sideBar"
      :class="[
        hidden? '': 'tc-sideBar-active'
    ]"
    >
      <div class="tc-sideBar-info">
        <img class="tc-sideBar-info-img" :src="avatar"/>
        <div class="tc-sideBar-info-name">{{nickName}}</div>
      </div>
      <div class="tc-sideBar-menu-item" v-for="item in menuList">
        <div>
          <img class="tc-sideBar-menu-item-tag" :src="item.tag"/>
        </div>
        <div class="tc-sideBar-menu-item-name">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      menuList: {
        type: Array
      },
      avatar: {
        type: String,
        default: ''
      },
      nickName: {
        type: String,
        default: 'Task'
      },
      hidden: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      changeSideBarVisible () {
        this.hidden = true
      }
    }
  }
</script>

<style lang="scss">
  @import "../common/styles/components/sideBar";
</style>
