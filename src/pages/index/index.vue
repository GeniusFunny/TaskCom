<template>
  <div>123</div>
</template>

<script>
import { wxLogin, getUserInfo, setStorage } from '../../utils/wxUtils'
export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo: {}
    }
  },
  methods: {
    bindViewTap () {
      console.log('爷爷')
    },
    getUserInfo () {
      // 调用登录接口
      wxLogin()
        .then(res => getUserInfo())
        .then(res => {
          console.log(res.userInfo)
          this.userInfo = res.userInfo
          setStorage('wxAvatar', res.userInfo.avatarUrl)
          setStorage('nickName', res.userInfo.nickName)
        })
      console.log(123)
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    },
    buttonClick (e) {
      console.log(e)
      console.log('爸爸')
    }
  },
  created () {
    this.getUserInfo()
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
