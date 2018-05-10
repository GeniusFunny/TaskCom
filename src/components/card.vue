<template>
  <div class="tc-card">
    <img class="tc-card-avatar" :src="avatar" background-size="cover"/>
    <div class="tc-card-infoContainer">
      <div class="tc-card-reputation">{{reputation}}</div>
      <div class="tc-card-title">{{title}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['avatar', 'reputation', 'title'],
  onError () {
    console.log('报错了')
  }
}
</script>

<style lang="scss">
  @import '../common/styles/components/card'
</style>
