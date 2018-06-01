<template>
  <div class="index">
    <div>
      <button open-type="getUserInfo" @getuserinfo="bindGetUserInfo">授权</button>
    </div>
  </div>
</template>

<script>
  import {wxLogin, setStorage, jumpTo, toast} from '../../utils/wxUtils'
  import { Login } from '../../api/API'
  export default {
    methods: {
      bindGetUserInfo (e) {
        let info = JSON.parse(e.mp.detail.rawData)
        setStorage('nickName', info.nickName)
        setStorage('avatar', info.avatarUrl)
        wxLogin()
          .then(res => {
            return Login(res.code)
          })
          .then(res => {
            setStorage('test', true)
            if (res.data.isNew) {
              jumpTo('../editInfo/editInfo')
            } else {
              jumpTo('../personalCenter/personalCenter')
            }
          })
          .catch(err => {
            toast('网络错误', 'none')
            console.error(err)
          })
      }
    }
  }
</script>

<style lang="scss">
  @import "../../common/styles/pages/index";
</style>
