<template>
  <div>
    <Input :type="taskName">任务名称</Input>
    <Input :type="days">任务坚持天数</Input>
    <Input :type="players">参与人数</Input>
  </div>
</template>

<script>
  import Input from './input'
  export default {
    data () {
      return {
        taskName: 'input',
        days: 'picker',
        players: 'picker'
      }
    },
    props: {},
    components: {
      Input
    }
  }
</script>

<style>
  @import '../common/styles/components/tabInfo.scss';
</style>
