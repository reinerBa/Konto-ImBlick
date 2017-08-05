<template>
  <div>
    <ul class="nav navbar-nav">
    <li v-for="route in items">
        <router-link :to="route.path">
            <span ></span> {{ route.display }}
        </router-link>
    </li>
  </ul>
</div>
</template>

<script>

  export default {
    name: 'navigation',
    created() {
      this.$router.options.routes.forEach(route => {
        this.items.push({
          name: route.name
            , path: route.path
          })
      })
        }
        , data() {
            return {
                items: []
            }
        }
      }
</script>

<style>
</style>
