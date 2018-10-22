<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
let echarts = require('echarts/lib/echarts')
export default {
  name: 'App'
}
</script>

<style lang="stylus">
@import './common/stylus/index.styl'
</style>
