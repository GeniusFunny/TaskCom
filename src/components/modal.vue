<template>
  <div class="tc-modal" :hidden="hidden === undefined || hidden" @click="modalClick">
    <div class="tc-modal-body">
      <div class="tc-modal-body-content">创建成功！</div>
      <div class="tc-modal-body-options">
        <button class="tc-modal-body-options-item tc-modal-body-options-item-font" open-type="share" id="share">分享到微信</button>
        <button class="tc-modal-body-options-item tc-modal-body-options-item-font">关闭</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      content: {
        type: String,
        default: '创建成功'
      },
      hidden: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      modalClick (e) {
        if (e.target.id === '') {
          this.hidden = true
          this.$emit('shareTask', 'close')
        } else {
          this.$emit('shareTask', e.target.id)
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "../common/styles/components/modal";
</style>
