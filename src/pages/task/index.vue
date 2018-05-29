<template>
  <div class="task">
    <infoItem />
    <taskList type="finished"/>
    <taskList type="unfinished" />
    <avatarList />
  </div>
</template>

<script>
  // import {toast, getStorage} from '../../utils/wxUtils'
  import {GetTaskInfo} from '../../api/API'
  import infoItem from '../../components/infoitem'
  import taskList from '../../components/taskList'
  import avatarList from '../../components/avatarList'

  export default {
    data () {
      return {
        info: {
          groupId: 1,
          share: false
        }
      }
    },
    components: {
      infoItem,
      taskList,
      avatarList
    },
    onLoad () {
      if (this.$root.$mp.query.hasOwnProperty('share')) {
        this.share = true
        this.info.groupId = this.$root.$mp.query.groupId
      }
      GetTaskInfo(this.groupId)
    }
  }
</script>

<style lang="scss">
  @import "../../common/styles/pages/task";
</style>
