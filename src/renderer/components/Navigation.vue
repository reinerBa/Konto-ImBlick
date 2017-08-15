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
.smalltalk .content-area > input{
  -webkit-text-security: disc;
}
.smalltalk .page{
  background-color: darkgray;
  top: 50%;
  position: absolute;
  left: 20%;
  border: 1px solid black;
  box-shadow: 0 0 2px 1px darkgrey;
  padding: 0.75em;
}
.smalltalk{
  background-color: rgba(58, 87, 116, .25);
  height: 100vh;
  top: 0;
  position: absolute;
  width: 100vw;
}
</style>
