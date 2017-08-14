<template>
  <div id="wrapper">
    <h1 v-if="!$store.state.Accounts.selectedAcc.length">Es wurden keine Kontodaten ausgewählt</h1>
    <div v-else>
      Salden:
      <template v-for="d in $store.state.Accounts.selectedAcc">
        <h2>{{d.name | filename}}</h2>
        <div v-for="n in d.data" class="auszug">
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
    </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'salden'
}
</script>

<style>
.auszug{
  padding: .5rem 0;
  border: 1px solid lightgrey;
}
.saetze{
  padding: 0 .5rem;
}
.red{
  color:red;
}
</style>
