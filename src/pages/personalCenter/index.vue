<template>
  <div>
    <card :avatar="userInfo.avatar" :reputation="userInfo.reputation" :title="userInfo.title" />
  </div>
</template>

<script>
import card from '../../components/card'
import {getStorage} from '../../utils/wxUtils'
export default {
  components: {
    card
  },

  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    getUserInfo () {
      this.userInfo['avatar'] = getStorage('wxAvatar')
      this.userInfo['reputation'] = 1000
      this.userInfo['title'] = '声名鹊起'
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang="scss">
</style>
