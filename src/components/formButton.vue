<template>
  <form report-submit="true" @submit="submit" class="tc-formButton">
    <button formType="submit">{{buttonContent || '创建任务'}}</button>
  </form>
</template>

<script>
  export default {
    props: {
      buttonContent: {
        type: String,
        default: '创建任务'
      }
    },
    methods: {
      submit (e) {
        this.$emit('getFormId', e.target.formId)
      }
    }
  }
</script>

<style lang="scss">
  @import "../common/styles/components/formButton";
</style>
