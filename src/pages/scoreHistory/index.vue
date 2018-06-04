<template>
  <div class="scoreHistory">
    <div v-if="historyList !== undefined && historyList.length === 0 && hasLoaded" style="color: #997625; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 28rpx;">小主，这里是空的。</div>
    <Score v-for="(item, index) in historyList" :info="item" :key="index"/>
  </div>
</template>

<script>
  import {GetScoreHistory} from '../../api/API'
  import {showLoading, hideLoading} from '../../utils/wxUtils'
  import {normalizeTime} from '../../utils/utils'
  import Score from '../../components/scoreHistoryItem'
  export default {
    data () {
      return {
        type: 0,
        page: 1,
        pageSum: 1,
        historyList: [],
        hasLoaded: false
      }
    },
    components: {
      Score
    },
    methods: {
      getScoreHistory () {
        GetScoreHistory([this.type, this.page])
          .then(res => {
            let data = res.data.scores.map(item => {
              return {
                ...item,
                time: normalizeTime(item.currentDay)
              }
            })
            this.pageSum = res.pageSum
            this.page++
            this.historyList = this.historyList.concat(data)
            this.hasLoaded = true
          })
      }
    },
    onReachBottom () {
      if (this.page <= this.pageSum) {
        this.getScoreHistory()
      }
    },
    beforeMount () {
      if (this.$root.$mp.query.hasOwnProperty('type')) {
        this.type = this.$root.$mp.query.type
      }
      showLoading()
      this.getScoreHistory()
      setTimeout(() => {
        hideLoading()
      }, 1000)
    },
    onUnload () {
      this.type = 0
      this.page = 1
      this.pageSum = 1
      this.historyList = []
      this.hasLoaded = false
    }
  }
</script>

<style lang="scss">
  @import "../../common/styles/pages/scoreHistory";
</style>
