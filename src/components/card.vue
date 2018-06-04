<template>
  <div class="tc-card">
    <img class="tc-card-avatar" :src="avatar" background-size="cover"/>
    <div class="tc-card-infoContainer">
      <div class="tc-card-nickname">
        {{nickName}}
      </div>
      <div class="tc-card-reputationGroup">
        <div class="tc-card-reputation tc-card-reputationGroup-firstChild">
          <div class="tc-card-reputation-value" @click="scoreClick" id="1">{{daily}}</div>
          <div class="tc-card-reputation-name">个人</div>
        </div>
        <div class="tc-card-reputation">
          <div class="tc-card-reputation-value" @click="scoreClick" id="0">{{contend}}</div>
          <div class="tc-card-reputation-name">多人</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['avatar', 'contend', 'nickName', 'daily'],
  methods: {
    scoreClick (e) {
      this.$emit('getMoreScoreInfo', e.target.id)
    }
  }
}
</script>

<style lang="scss">
  @import '../common/styles/components/card';
</style>
