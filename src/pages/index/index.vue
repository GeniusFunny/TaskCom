<template>
  <div class="index">
    <img src="/static/images/cover.png"/>
    <div>
      <button open-type="getUserInfo" @getuserinfo="bindGetUserInfo">
        <img src="/static/images/button.png"/>
        <div>授权进入</div>
      </button>
    </div>
  </div>
</template>

<script>
  import {wxLogin, setStorage, jumpTo, showLoading, hideLoading} from '../../utils/wxUtils'
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
    }
  }
</script>

<style lang="scss">
  @import "../../common/styles/pages/index";
</style>
