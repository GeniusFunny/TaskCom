<template>
  <div>
    <button open-type="getUserInfo" @getuserinfo="bindGetUserInfo">授权</button>
  </div>
</template>

<script>
import { wxLogin, setStorage, jumpTo } from '../../utils/wxUtils'
import { Login } from '../../api/API'
export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo: {}
    }
  },
  methods: {
    bindGetUserInfo (e) {
      let info = JSON.parse(e.mp.detail.rawData)
      console.log(info)
      setStorage('nickName', info.nickName)
      setStorage('avatar', info.avatarUrl)
      wxLogin()
        .then(res => {
          return Login(res.code)
        })
        .then(res => {
          if (res.data.isNew) {
            jumpTo('../editInfo/editInfo')
          } else {
            console.log(123)
            jumpTo('../personalCenter/personalCenter')
          }
        })
    }
  }
}
</script>

<style lang="scss">
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}

.counter {
  display: inline-block;
  margin: 10px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
