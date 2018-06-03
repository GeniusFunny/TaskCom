<template>
  <div class="index">
    <img src="/static/images/cover.png"/>
    <div style="z-index: 2000; position: absolute; bottom: -130rpx; text-align: right; color: #2e2e2e; font-size: 24rpx;">
      &emsp;powered by 为之工作室 © 2018
    </div>
    <div>
      <button open-type="getUserInfo" @getuserinfo="bindGetUserInfo">
        <img src="/static/images/button.png"/>
        <div>授权进入</div>
      </button>
    </div>
  </div>
</template>

<script>
  import {wxLogin, setStorage, jumpTo, showLoading, hideLoading, modal, toast} from '../../utils/wxUtils'
  import { Login } from '../../api/API'
  export default {
    methods: {
      bindGetUserInfo (e) {
        let info = JSON.parse(e.mp.detail.rawData)
        setStorage('nickName', info.nickName)
        setStorage('avatar', info.avatarUrl)
        showLoading()
        wxLogin()
          .then(res => {
            return Login(res.code)
          })
          .then(res => {
            hideLoading()
            setTimeout(() => {
              if (res.data.isNew) {
                jumpTo('../editInfo/editInfo')
              } else {
                jumpTo('../personalCenter/personalCenter')
              }
            }, 500)
          })
          .catch(err => {
            console.error(err)
          })
      }
    },
    onLoad () {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate((res) => {
        console.log(res.hasUpdate)
      })
      updateManager.onUpdateReady(() => {
        modal('更新提示', '新版本已经准备好，是否重启应用')
          .then(() => {
            updateManager.applyUpdate()
          })
          .catch(err => {
            toast('必须使用新版本', 'none')
            console.log(err)
          })
      })
    }
  }
</script>

<style lang="scss">
  @import "../../common/styles/pages/index";
</style>
