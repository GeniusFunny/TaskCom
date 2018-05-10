<template>
  <div class="container" @click="clickHandle('test click', $event)">
    <div class="userinfo" @click="bindViewTap">
      <div class="userinfo-nickname">
        <card :avatar="userInfo.avatarUrl" :text="userInfo.nickName"></card>
      </div>
    </div>
  </div>
</template>

<script>
import { wxLogin, getUserInfo, setStorage } from '../../utils/wxUtils'
import card from '../../components/card'

export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo: {}
    }
  },

  components: {
    card
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
        })
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
    // 调用应用实例的方法获取全局数据
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
