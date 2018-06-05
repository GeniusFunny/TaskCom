<template>
  <form report-submit="true" @submit="submit" class="tc-formButton" :class="type? 'return' : ''">
    <button formType="submit" :disabled="!active">{{buttonContent || '创建任务'}}</button>
  </form>
</template>

<script>
  export default {
    props: {
      buttonContent: {
        type: String,
        default: '创建任务'
      },
      active: {
        type: Boolean,
        default: false
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
