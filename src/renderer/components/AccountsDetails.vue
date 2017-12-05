<template>
  <div id="wrapper">
    <div v-for="acc in $store.state.Accounts.accDetails" class="sepa">
      {{acc}}
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
    }
  }
</script>

<style scoped>
</style>
