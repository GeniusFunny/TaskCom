<template>
  <div class="tc-input">
    <label>{{info.name}}</label>
    <input v-if="info.type === 'input'" :value="info.value"  placeholder="请输入" @input="changeInput"/>
    <picker v-if="info.type === 'picker'" :value="info.value" :range="info.data" :id="info.id" @change="changeValue">
     {{info.data[info.value]}}
    </picker>
    <picker v-if="info.type === 'date'" :value="info.value" placeholder="请设置" mode="date" :start="info.start" :end="info.end" :id="info.id" @change="changeDate">
      {{info.value}}
    </picker>
  </div>
</template>

<script>
  export default {
    props: {
      info: {
        type: Object
      }
    },
    methods: {
      changeDate (e) {
        if (e.target.id === 'startTime') {
          this.$emit('changeStartTime', e.target.value)
        } else if (e.target.id === 'endTime') {
          this.$emit('changeEndTime', e.target.value)
        }
      },
      changeValue (e) {
        console.log(e)
        if (e.target.id === 'players') {
          this.$emit('changePlayerNum', e.target.value)
        } else if (e.target.id === 'isPublic') {
          this.$emit('changeIsPublic', e.target.value)
        }
      },
      changeInput (e) {
        this.$emit('changeTaskName', e.target.value)
      }
    },
    create () {}
  }
</script>

<style lang="scss">
  @import '../common/styles/components/input';
</style>
