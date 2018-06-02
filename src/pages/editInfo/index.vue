<template>
  <div class="editInfo">
    <div class="editInfo-container">
      <div class="editInfo-module editInfo-module-1">
        <div class="editInfo-avatarItem">
          <div class="editInfo-avatarItem-name">
            头像
          </div>
          <div class="editInfo-avatarItem-avatar">
            <img :src="info.avatar"/>
          </div>
        </div>
        <div class="editInfo-normalItem">
          <div>
            昵称
          </div>
          <input class="editInfo-normalItem-value" type="text" placeholder="未设置" :value="info.username" @input="bindUsernameChange"/>
        </div>
        <div class="editInfo-normalItem">
          <div>
            性别
          </div>
          <div class="editInfo-normalItem-img">
            <img :src="images.man" @click="changeGender" id="man"/>
            <img :src="images.woman" @click="changeGender" id="woman"/>
          </div>
        </div>
        <div class="editInfo-normalItem">
          <div>
            出生年月
          </div>
          <picker mode="date" :value="info.birthday" start="1990-01-01" end="2018-12-31" @change="bindBirthdayChange">
            <div class="editInfo-normalItem-value">
              {{info.birthday}}
            </div>
          </picker>
        </div>
        <div class="editInfo-normalItem">
          <div>
            地区
          </div>
          <input class="editInfo-normalItem-value" type="text" placeholder="未设置" :value="info.location" @input="bindLocationChange"/>
        </div>
      </div>
      <div class="editInfo-module editInfo-module-2">
        <div class="editInfo-normalItem">
          <div>
            大学
          </div>
          <input class="editInfo-normalItem-value" type="text" placeholder="未设置" :value="info.collage" @input="bindCollageChange"/>
        </div>
        <div class="editInfo-normalItem">
          <div>
            年级
          </div>
          <picker class="editInfo-normalItem-value" :value="info.grade" :range="infoOptions.gradeData" @change="bindGradeChange">
            {{infoOptions.gradeData[info.grade] || '未设置'}}
          </picker>
        </div>
      </div>
    </div>
    <div class="editInfo-bottomButton" @click="bindClickSubmit">
      <img src="/static/images/button.png" />
      <div class="editInfo-bottomButton-content">保存</div>
    </div>
  </div>
</template>

<script>
  import {GetUserInfo, UpdateUserInfo} from '../../api/API'
  import {getStorage, toast, jumpTo} from '../../utils/wxUtils'
  import {normalizeTime, cst2unix} from '../../utils/utils'

  export default {
    data () {
      return {
        info: {
          gender: 0,
          birthday: '未设置',
          location: '未设置',
          grade: '未设置',
          collage: '未设置',
          username: '未设置'
        },
        images: {
          man: '/static/images/man-1.png',
          woman: '/static/images/woman-1.png'
        },
        infoOptions: {
          gradeData: ['大一', '大二', '大三', '大四', '研一', '研二', '研三']
        }
      }
    },
    methods: {
      getInfo () {
        GetUserInfo()
          .then(res => {
            this.parseInfo(res.data.info)
          })
          .catch(err => {
            toast('暂时无法获取个人信息', 'none')
            console.error(err)
          })
      },
      parseInfo (data) {
        this.info = {
          gender: data.gender || 0,
          grade: data.grade || 0,
          birthday: normalizeTime(data.birthday) || '2018-12-31',
          location: data.location || '陕西西安',
          collage: data.collage || '西安电子科技大学',
          avatar: getStorage('avatar'),
          username: data.username
        }
        this.getGender()
      },
      getGender () {
        if (this.info.gender === 1) {
          this.images['man'] = '/static/images/man-2.png'
        } else {
          this.images['woman'] = '/static/images/woman-2.png'
        }
      },
      changeGender (e) {
        if (e.target.id === 'man') {
          this.images['man'] = '/static/images/man-2.png'
          this.images['woman'] = '/static/images/woman-1.png'
          this.info.gender = 1
        } else {
          this.images['man'] = '/static/images/man-1.png'
          this.images['woman'] = '/static/images/woman-2.png'
          this.info.gender = 0
        }
      },
      bindBirthdayChange (e) {
        this.info.birthday = e.target.value
      },
      bindUsernameChange (e) {
        this.info.username = e.target.value
      },
      bindLocationChange (e) {
        this.info.location = e.target.value
      },
      bindGradeChange (e) {
        this.info.grade = e.target.value
      },
      bindCollageChange (e) {
        this.info.collage = e.target.value
      },
      bindClickSubmit () {
        let data = {
          username: this.info.username,
          avatar: getStorage('avatar'),
          location: this.info.location,
          birthday: cst2unix(this.info.birthday),
          grade: this.info.grade,
          gender: this.info.gender,
          collage: this.info.collage
        }
        UpdateUserInfo(data)
          .then(res => {
            toast('保存成功')
            setTimeout(() => {
              jumpTo('../personalCenter/personalCenter')
            }, 1500)
          })
          .catch(err => {
            console.log(err)
            toast('用不要使用非法字符', 'none')
          })
      }
    },
    beforeMount () {
      this.getInfo()
    }
  }
</script>

<style lang="scss">
  @import "../../common/styles/pages/editInfo";
</style>
