<template>
  <div class="tc-modal" :hidden="hidden === undefined || hidden" @click="modalClick">
    <div class="tc-modal-body">
      <div class="tc-modal-body-content">创建成功！</div>
      <div class="tc-modal-body-options">
        <div class="tc-modal-body-options-item" id="shareToContacts">分享到联系人</div>
        <div class="tc-modal-body-options-item">关闭</div>
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
