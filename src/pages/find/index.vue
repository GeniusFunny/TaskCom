<template>
  <div class="find">
    <tab :type="info.type" @changeTab="changeTab"/>
    <rankItem v-for="(item, index) in rankList.top3" :username="item.username" :score="item.peopleScore" :position="index + 1" :avatar="item.avatar" :key="index" />
    <div class="find-restRank">
      <div v-for="(item, index) in rankList.rest" class="find-restRank-item" :key="index">
        <div class="find-restRank-item-position">{{index + 4}}</div>
        <img class="find-restRank-item-avatar" :src="item.avatar"/>
        <div class="find-restRank-item-name">{{item.username}}</div>
        <div class="find-restRank-item-score">{{item.peopleScore}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import tab from '../../components/tabFind'
  import rankItem from '../../components/rankItem'
  import {GetRank} from '../../api/API'
  import {showLoading, hideLoading} from '../../utils/wxUtils'
  export default {
    data () {
      return {
        rankList: {
          top3: [],
          rest: []
        },
        taskCircle: [],
        info: {
          type: 'rank'
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
      }
    },
    onPullDownRefresh () {
      if (this.info.type === 'rank') {
        this.getRank()
      } else {
        console.log(123)
      }
      setTimeout(() => {
        wx.stopPullDownRefresh()
      }, 1500)
    },
    beforeMount () {
      showLoading()
      this.getRank()
      setTimeout(() => {
        hideLoading()
      }, 1000)
    }
  }
</script>

<style lang="scss">
  @import "../../common/styles/pages/find";
</style>
