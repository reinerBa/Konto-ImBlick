<template>
  <div id="navWrapper">
    <ul class="nav navbar-nav">
    <li v-for="route in items">
        <router-link :to="route.path">
            <span ></span> {{ route.name }}
        </router-link>
    </li>
  </ul>
</div>
</template>

<script>

  export default {
    name: 'navigation',
    created () {
      this.$router.options.routes.forEach(route => {
        this.items.push({
          name: route.name,
          path: route.path
        })
      })
    },
    data () {
      return {
        items: []
      }
    }
  }
</script>

<style>
ul{
//  display: inline-flex;
  padding-left: .5rem;
}
#navWrapper{
  position: fixed;
  top: 0;
  left: 0;
  max-width: 100px;
  background-color: lightblue;
  border: 1px solid darkgrey;
}
li{
//  padding:.5rem;
display: block;
}
</style>
