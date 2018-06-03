<template>
  <div class="tc-tab" @click="tabClick">
    <div
      class="tc-tab-item"
      :class="[
        type === 'village' ? 'tc-tab-item-active' : ''
      ]"
      id="village"
    >任务村</div>
    <div
      class="tc-tab-item"
      :class="[
        type === 'rank' ? 'tc-tab-item-active' : ''
      ]"
      id="rank"
    >排行榜</div>
  </div>
</template>

<script>
  export default {
    props: {
      type: {
        type: String,
        default: 'village'
      }
    },
    methods: {
      tabClick (e) {
        this.$emit('changeTab', e.target.id)
      }
    }
  }
</script>

<style lang="scss">
  @import '../common/styles/components/tab';
</style>
