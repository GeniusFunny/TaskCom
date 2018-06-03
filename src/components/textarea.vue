<template>
  <div class="tc-textarea">
    <label>任务{{index + 1}}</label>
    <textarea :value="info.value" placeholder="30字以内" maxlength="30" :id="info.id" @input="changeTextarea"> </textarea>
    <img src="/static/images/delete.png" :id="info.id" @click="deleteTexterea"/>
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
      },
      deleteTexterea (e) {
        this.$emit('deleteTaskItem', parseInt(e.target.id))
      }
    }
  }
</script>

<style lang="scss">
  @import "../common/styles/components/textarea";
</style>
