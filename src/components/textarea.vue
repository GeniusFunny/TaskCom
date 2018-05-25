<template>
  <div class="tc-textarea">
    <label>任务{{index + 1}}</label>
    <textarea :value="info.value" placeholder="30字以内" maxlength="30" :id="info.id" @blur="changeTextarea"> </textarea>
  </div>
</template>

<script>
  export default {
    props: {
      info: {
        type: Object
      },
      index: {
        type: Number
      }
    },
    methods: {
      changeTextarea (e) {
        this.$emit('changeTaskItemContent', e.target.id, e.target.value)
      }
    }
  }
</script>

<style lang="scss">
  @import "../common/styles/components/textarea";
</style>
