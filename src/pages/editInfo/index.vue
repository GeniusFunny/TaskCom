<template>
  <div class="editInfo">
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
          性别
        </div>
        <div class="editInfo-normalItem-img">
          <img :src="images.man" @click="changeSex" id="man"/>
          <img :src="images.woman" @click="changeSex" id="woman"/>
        </div>
      </div>
      <div class="editInfo-normalItem">
        <div>
          出生年月
        </div>
        <picker mode="date" :value="info.date" start="1990-01-01" end="2018-12-31" @change="bindDateChange">
          <div class="editInfo-normalItem-value">
            {{info.date}}
          </div>
        </picker>
      </div>
      <div class="editInfo-normalItem">
        <div>
          地区
        </div>
        <picker class="editInfo-normalItem-value" :value="info.region" :range="infoOptions.regionData" @change="bindRegionChange">
          {{infoOptions.regionData[info.region] || '未设置'}}
        </picker>
      </div>
    </div>
    <div class="editInfo-module editInfo-module-2">
      <div class="editInfo-normalItem">
        <div>
          大学
        </div>
        <input class="editInfo-normalItem-value" type="text" placeholder="未设置" :value="info.university" @input="bindUniversityChange"/>
      </div>
      <div class="editInfo-normalItem">
        <div>
          年级
        </div>
        <picker class="editInfo-normalItem-value" :value="info.degree" :range="infoOptions.degreeData" @change="bindDegreeChange">
          {{infoOptions.degreeData[info.degree] || '未设置'}}
        </picker>
      </div>
    </div>
  </div>
</template>

<script>
  import {GetMoreUserInfo} from '../../api/API'
  export default {
    data () {
      return {
        info: {
          sex: 'man',
          date: '未设置',
          region: '未设置',
          degree: '未设置',
          university: ''
        },
        images: {
          man: '/static/images/man-1.png',
          woman: '/static/images/woman-1.png'
        },
        infoOptions: {
          regionData: ['晋西北', '东三省'],
          degreeData: ['大一', '大二', '大三', '大四', '研一', '研二']
        }
      }
    },
    methods: {
      getInfo () {
        GetMoreUserInfo()
          .then(res => {
            this.parseInfo(res.data)
          })
      },
      parseInfo (data) {
        console.log(data)
        this.info = data
        this.getSex()
      },
      getSex () {
        if (this.info.sex === 'man') {
          this.images['man'] = '/static/images/man-2.png'
        } else {
          this.images['woman'] = '/static/images/woman-2.png'
        }
      },
      changeSex (e) {
        if (e.target.id === 'man') {
          this.images['man'] = '/static/images/man-2.png'
          this.images['woman'] = '/static/images/woman-1.png'
        } else {
          this.images['man'] = '/static/images/man-1.png'
          this.images['woman'] = '/static/images/woman-2.png'
        }
      },
      bindDateChange (e) {
        this.info.date = e.target.value
      },
      bindRegionChange (e) {
        this.info.region = e.target.value
      },
      bindDegreeChange (e) {
        this.info.degree = e.target.value
      },
      bindUniversityChange (e) {
        this.info.name = e.target.value
      }
    },
    created () {
      this.getInfo()
    }
  }
</script>

<style lang="scss">
  @import "../../common/styles/pages/editInfo";
</style>
