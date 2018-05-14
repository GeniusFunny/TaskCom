<template>
  <button
    class="tc-button"
    @click.stop="handleClick"
    :class="[
      type? 'tc-button-' + type: '',
      size? 'tc-button-' + size: ''
    ]"
  >
    <span class="tc-button-content"><slot></slot></span>
  </button>
</template>

<script>
  export default {
    props: {
      type: {
        type: String,
        default: 'default'
      },
      size: String
    },
    methods: {
      handleClick (e) {
        this.$emit('click', e)
      }
    }
  }
</script>

<style lang="scss">
  @import '../common/styles/components/button';
</style>
