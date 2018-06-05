<template>
  <div class="find">
    <tab :type="info.type" @changeTab="changeTab"/>
    <div :hidden="info.type !== undefined && info.type === 'village'">
      <rankItem v-for="(item, index) in rankList.top3" :username="item.username" :score="item.peopleScore" :position="index + 1" :avatar="item.avatar" :key="index" />
    </div>

    <div :hidden="info.type !== undefined && info.type === 'village'" class="find-restRank">
      <div v-for="(item, index) in rankList.rest" class="find-restRank-item" :key="index">
        <div class="find-restRank-item-position">{{index + 4}}</div>
        <img class="find-restRank-item-avatar" :src="item.avatar"/>
        <div class="find-restRank-item-name">{{item.username}}</div>
        <div class="find-restRank-item-score">{{item.peopleScore}}</div>
      </div>
    </div>
    <div
      :hidden="info.type !== 'village'"
      class="find-village"
      @click="getTaskMoreInfo"
    >
      <div style="text-align: center; font-size: 18rpx; color: #997625;">每次下拉都有不同的体验</div>
      <div v-for="(item, index) in villageTaskList" class="find-village-item" :key="index">
        <div class="find-village-item-tag">
          <img :src="item.sponsorAvatar"/>
          <span>{{item.sponsorName}}</span>
          <div style="position: absolute; right: 30rpx; margin-top: -32rpx">
            @{{item.sponsorCollage}}
          </div>
        </div>
        <div class="find-village-item-content" :id="item.groupId">
          <div class="find-village-item-content-title" :id="item.groupId">
            {{item.title}}
          </div>
          <div class="find-village-item-content-time" :id="item.groupId">
            {{item.time}}
          </div>
          <div class="find-village-item-content-members">
            <div v-if="item.members.length > 3" class="find-village-item-content-members-count">
              <div>
                +{{item.members.length - 3}}
              </div>
            </div>
            <img v-for="(item2, index2) in item.members" :src="item2.avatar" :key="index2" v-if="index2 <= 2"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import tab from '../../components/tabFind'
  import rankItem from '../../components/rankItem'
  import {GetRank, GetTaskVillage} from '../../api/API'
  import {showLoading, hideLoading, jumpTo} from '../../utils/wxUtils'
  export default {
    data () {
      return {
        rankList: {
          top3: [],
          rest: []
        },
        villageTaskList: [],
        info: {
          type: 'village'
        },
        rankPage: 1,
        rankPageSum: 1,
        touch: {
          touchDot: 0,
          time: 0,
          interval: 0,
          refresh: false
        }
      }
    },
    components: {
      tab,
      rankItem
    },
    methods: {
      changeTab (key) {
        this.info.type = key
      },
      getRank (page = 1) {
        GetRank(page)
          .then(res => {
            this.rankPageSum = res.data.pageSum
            this.rankPage++
            this.rankList.top3 = res.data.rank.slice(0, 3)
            if (res.data.rank.length >= 3) {
              this.rankList.rest = res.data.rank.slice(3, res.data.rank.length)
            }
          })
      },
      getVillageTask () {
        GetTaskVillage()
          .then(res => {
            this.villageTaskList = res.data.items.map(item => ({
              ...item,
              time: item.startTime.split('T')[0] + ' ~ ' + item.endTime.split('T')[0]
            }))
          })
      },
      getTaskMoreInfo (e) {
        if (e.target.id) {
          jumpTo(`../simpleTask/simpleTask?groupId=${e.target.id}&share=true&inApp=true`)
        }
      },
      touchEventStart (e) {
        this.touch.touchDot = e.pageX
        console.log('滑动开始', e.pageX)
      },
      touchEventMove (e) {
        console.log(this.touch.touchDot - e.pageX)
        if (Math.abs(this.touch.touchDot - e.pageX) > 120 && !this.touch.refresh) {
          showLoading('更新任务村ing')
          this.touch.refresh = true
          this.getVillageTask()
          setTimeout(() => {
            hideLoading()
          }, 1000)
        }
      },
      touchEventEnd (e) {
        console.log('滑动结束')
        this.touch.refresh = false
      }
    },
    onPullDownRefresh () {
      if (this.info.type === 'rank') {
        this.rankPage = 1
        this.getRank(1)
      } else {
        this.getVillageTask()
      }
      setTimeout(() => {
        wx.stopPullDownRefresh()
      }, 700)
    },
    onReachBottom () {
      if (this.info.type === 'rank') {
        if (this.rankPage <= this.rankPageSum && this.rankPage <= 10) {
          showLoading('加载更多伙伴')
          GetRank(this.rankPage)
            .then(res => {
              if (this.rankPage === 10 && res.data.rank.length === 10) {
                res.data.rank.pop()
              }
              this.rankPage++
              this.rankPageSum = res.data.pageSum
              this.rankList.rest = this.rankList.rest.concat(res.data.rank)
              setTimeout(() => {
                hideLoading()
              }, 700)
            })
        }
      }
    },
    beforeMount () {
      showLoading()
      this.touch.refresh = false
      this.getRank(1)
      this.getVillageTask()
      setTimeout(() => {
        hideLoading()
      }, 1500)
    }
  }
</script>

<style lang="scss">
  @import "../../common/styles/pages/find";
</style>
