<template>
  <div>当前任务groupId:{{info.groupId}}</div>
</template>

<script>
  import {toast, getStorage} from '../../utils/wxUtils'
  export default {
    data () {
      return {
        info: {
          groupId: 1,
          share: false
        }
      }
    },
    onLoad () {
      if (this.$root.$mp.query.hasOwnProperty('share')) {
        this.share = true
        this.info.groupId = this.$root.$mp.query.groupId
        console.log(123)
        if (getStorage('test')) {
          toast('已经注册')
        } else {
          toast('没有注册')
        }
      }
    }
  }
</script>

<style lang="scss">

</style>
