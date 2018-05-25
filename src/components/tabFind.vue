<template>
  <div class="tc-tab" @click="tabClick">
    <div
      class="tc-tab-item"
      :class="[
        type === 'taskCircle' ? 'tc-tab-item-active' : ''
      ]"
      id="taskCircle"
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
    data () {
      return {
        data: {}
      }
    },
    props: {
      type: {
        type: String,
        default: 'taskCircle'
      }
    },
    methods: {
      tabClick (e) {
        console.log(e.target.id)
        this.$emit('changeTab', e.target.id)
      }
    }
  }
</script>

<style lang="scss">
  @import '../common/styles/components/tab';
</style>
