<template>
  <div class="find">
    <tab :type="info.type" @changeTab="changeTab"/>
    <rankItem v-for="(item, index) in rankList.top3" :username="item.username" :position="item.position" :key="index" />
    <div class="find-restRank">
      <div v-for="(item, index) in rankList.rest" class="find-restRank-item" :key="index">
        <div class="find-restRank-item-position">{{item.position}}</div>
        <img class="find-restRank-item-avatar" src="/static/images/avatar.jpeg"/>
        <div class="find-restRank-item-name">{{item.username}}</div>
        <div class="find-restRank-item-score">{{item.score}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import tab from '../../components/tabFind'
  import rankItem from '../../components/rankItem'
  export default {
    data () {
      return {
        rankList: [],
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
      }
    },
    beforeMount () {
      this.rankList = {
        top3: [
          {
            username: 'geniusFunny',
            position: 1
          },
          {
            username: 'Async',
            position: 2
          },
          {
            username: 'Await',
            position: 3
          }
        ],
        rest: [
          {
            username: 'Generator',
            position: 4,
            score: 123
          },
          {
            username: 'Iterator',
            position: 5,
            score: 122
          },
          {
            username: 'Promise',
            position: 6,
            score: 121
          }
        ]
      }
    }
  }
</script>

<style lang="scss">
  @import "../../common/styles/pages/find";
</style>
