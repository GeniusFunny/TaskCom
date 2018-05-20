<template>
  <div class="tc-button" @click="handleClick" id="button">
    <img src="/static/images/button.png"/>
    <div class="tc-button-info">
      <slot @click="handleClick"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      handleClick (e) {
        console.log(e.target)
        this.$emit('buttonClick', e)
      }
    }
  }
</script>

<style lang="scss">
  @import '../common/styles/components/button';
</style>
