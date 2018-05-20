<template>
  <div class="tc-input">
    <label>{{info.name}}</label>
    <input v-if="info.type === 'input'" :value="info.value"  placeholder="请输入"/>
    <picker v-else :value="info.value" :range="info.data">
     {{info.data[info.value]}}
    </picker>
  </div>
</template>

<script>
  export default {
    props: {
      info: {
        type: Object
      }
    },
    create () {}
  }
</script>

<style lang="scss">
  @import '../common/styles/components/input';
</style>
