<template>
  <div id="wrapper">
    <div>Salden:
      <div v-for="n in $store.state.Accounts.selectedAcc" class="auszug">
        <div>
          {{n.anfangssaldo.buchungsdatum | isoToLocal}}- {{n.schlusssaldo.buchungsdatum | isoToLocal}}
        </div><div>
          <span v-if="n.anfangssaldo.soll_haben==='S'"> -</span> {{n.anfangssaldo.value}} €
          <span v-if="n.schlusssaldo.soll_haben==='S'"> -</span> {{n.schlusssaldo.value}} €
        </div>
        <div v-for="sal in n.saetze" class="saetze">
          {{sal.datum | isoToLocal}} <span v-if="sal.soll_haben==='S'"> -</span> <span :class="{'red':sal.soll_haben==='S'}">{{sal.value}}</span>
        </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'charts',
  methods: {
  },
  filters: {
    isoToLocal (d) {
      return new Date(d).toLocaleDateString()
    }
  }
}
</script>

<style>
.red{
  color:red;
}
</style>
