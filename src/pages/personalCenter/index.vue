<template>
  <div>
    <div class="personalCenter">
      <div class="personalCenter-menu">
        <img class="personalCenter-menu-icon" src="../../../static/menu.png"/>
      </div>
      <card :avatar="userInfo.avatar" :contend="userInfo.contend" :nickname="userInfo.nickname" :daily="userInfo.daily"/>
    </div>
    <tabBar />
  </div>
</template>

<script>
import card from '../../components/card'
import tabBar from '../../components/tabBar'
import {getStorage} from '../../utils/wxUtils'
export default {
  components: {
    card,
    tabBar
  },

  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    getUserInfo () {
      this.userInfo['avatar'] = getStorage('wxAvatar') || 'http://5b0988e595225.cdn.sohucs.com/images/20170911/aa2247ad3e9345809e4bc1cb3c3f30fe.jpeg'
      this.userInfo['contend'] = 1988
      this.userInfo['daily'] = 2433
      this.userInfo['nickname'] = getStorage('nickname') || 'chenchen'
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang="scss">
  @import '../../common/styles/pages/personalCenter';
</style>
