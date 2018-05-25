<template>
  <div class="find">
    <tab :type="this.info.type" @changeTab="changeTab"/>
  </div>
</template>

<script>
  import tab from '../../components/tabFind'
  export default {
    data () {
      return {
        rank: [],
        taskCircle: [],
        info: {
          type: 'taskCircle'
        }
      }
    },
    components: {
      tab
    },
    methods: {
      changeTab (key) {
        this.info.type = key
      }
    }
  }
</script>

<style lang="scss">
  @import "../../common/styles/pages/find";
</style>
