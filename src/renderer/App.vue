<template>
  <div id="app">
    <bread-crumbs></bread-crumbs>
    <navigation></navigation>
    <div class="content">
    <router-view></router-view>
  </div></div>
</template>

<script>
import navigation from './components/Navigation'
import BreadCrumbs from './components/BreadCrumbs'
import res from 'vue-responsive/dist/Vue_Responsive.common.js'
import Vue from 'vue'

Vue.directive('responsiveness', res)

export default {
  name: 'account-viewer',
  components: { navigation, BreadCrumbs }
}
</script>

<style scoped>
.content{
  margin-left: 100px;
}
</style>
