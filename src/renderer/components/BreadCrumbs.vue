<template>
  <ul class="breadcrumbs2 small">
    <!-- <li><a href="#"><span class="icon mif-home"></span></a></li> -->
    <li v-for="h in history">
      <a :href="'#'+h.path">
        {{h.name}}
        <span v-if="!h.name" class="icon mif-home"></span>
      </a>
    </li>
  </ul>
</template>

<script>
import {routerHistory} from '../router/index'
export default {
  name: 'bread-crumbs',
  data () {
    return {
      history: routerHistory
    }
  }
}
</script>

<style scoped>
</style>
