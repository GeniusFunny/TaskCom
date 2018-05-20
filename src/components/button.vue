<template>
  <div class="tc-button" @click="handleClick" id="button">
    <img src="/static/images/button.png"/>
    <div class="tc-button-info">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      handleClick (e) {
        console.log('我点击的是 Button 组件， 触发父组件buttonClick事件')
        this.$emit('buttonClick', e)
      }
    }
  }
</script>

<style lang="scss">
  @import '../common/styles/components/button';
</style>
