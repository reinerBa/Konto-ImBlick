<template>
  <div id="app">
    <navigation></navigation>
    <div class="content">
    <router-view></router-view>
  </div></div>
</template>

<script>
import navigation from './components/Navigation'

export default {
  name: 'account-viewer',
  components: { navigation }
}
</script>

<style scoped>
.content{
  margin-left: 100px;
}
</style>
