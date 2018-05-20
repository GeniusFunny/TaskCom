<template>
  <div class="tc-tab" @click="tabClick">
    <div
      class="tc-tab-item"
      :class="[
        type === 'daily' ? 'tc-tab-item-active' : ''
      ]"
      id="daily"
    >单人</div>
    <div
      class="tc-tab-item"
      :class="[
        type === 'multiplayer' ? 'tc-tab-item-active' : ''
      ]"
      id="multiplayer"
    >多人</div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        data: {}
      }
    },
    props: {
      menuList: {
        type: Array,
        default: []
      },
      type: {
        type: String,
        default: 'daily'
      }
    },
    methods: {
      tabClick (e) {
        this.$emit('changeTaskType', e.target.id)
      }
    }
  }
</script>

<style lang="scss">
  @import '../common/styles/components/tab';
</style>
