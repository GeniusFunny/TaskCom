<template>
  <div class="find">
    <tab :type="info.type" @changeTab="changeTab"/>

    <rankItem v-if="info.type === 'rank'" v-for="(item, index) in rankList.top3" :username="item.username" :score="item.peopleScore" :position="index + 1" :avatar="item.avatar" :key="index" />

    <div :hidden="info.type !== undefined && info.type === 'village'" class="find-restRank">
      <div v-for="(item, index) in rankList.rest" class="find-restRank-item" :key="index">
        <div class="find-restRank-item-position">{{index + 4}}</div>
        <img class="find-restRank-item-avatar" :src="item.avatar"/>
        <div class="find-restRank-item-name">{{item.username}}</div>
        <div class="find-restRank-item-score">{{item.peopleScore}}</div>
      </div>
    </div>
    <div :hidden="info.type !== 'village'" class="find-village" @click="getTaskMoreInfo">
      <div v-for="(item, index) in villageTaskList" class="find-village-item" :key="index">
        <div class="find-village-item-tag">
          <img :src="item.sponsorAvatar"/>
          <span>{{item.sponsorName}}</span>
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
                {{item.members.length - 3}}
              </div>
            </div>
            <img v-for="(item2, index2) in item.members" :src="item2.avatar" :key="index2" />
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
        page: 1,
        pageTotal: 1,
        info: {
          type: 'village'
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
      getRank () {
        GetRank(1)
          .then(res => {
            this.rankList.top3 = res.data.rank.slice(0, 3)
            if (res.data.rank.length >= 3) {
              this.rankList.rest = res.data.rank.slice(3, res.data.rank.length)
            }
          })
      },
      getVillageTask () {
        if (this.page <= this.pageTotal) {
          GetTaskVillage(this.page)
            .then(res => {
              let data = res.data.items.map(item => ({
                ...item,
                time: item.startTime.split('T')[0] + ' ~ ' + item.endTime.split('T')[0]
              }))
              try {
                this.villageTaskList = this.villageTaskList.concat(data)
              } catch (e) {
                console.log(e)
              }
              this.pageTotal = res.data.count
            })
        }
      },
      getTaskMoreInfo (e) {
        if (e.target.id) {
          jumpTo(`../simpleTask/simpleTask?groupId=${e.target.id}&share=true&inApp=true`)
        }
      }
    },
    onPullDownRefresh () {
      if (this.info.type === 'rank') {
        this.getRank()
      } else {
        this.page = 1
        this.pageTotal = 1
        this.villageTaskList = []
        this.getVillageTask()
      }
      setTimeout(() => {
        wx.stopPullDownRefresh()
      }, 3000)
    },
    onReachBottom () {
      if (this.info.type === 'village') {
        if (++this.page <= this.pageTotal) {
          showLoading()
          this.getVillageTask()
          setTimeout(() => {
            hideLoading()
          }, 1500)
        }
      }
    },
    beforeMount () {
      showLoading()
      this.getRank()
      this.getVillageTask()
      setTimeout(() => {
        hideLoading()
      }, 3000)
    }
  }
</script>

<style lang="scss">
  @import "../../common/styles/pages/find";
</style>
