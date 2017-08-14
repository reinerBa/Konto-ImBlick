<template>
  <div id="wrapper">
    <h1 v-if="!$store.state.Accounts.selectedAcc.length">Es wurden keine Kontodaten ausgewählt</h1>
    <div v-else v-for="n in $store.state.Accounts.selectedAcc" class="oneChart">
      <div class="allInline tCenter">
        <strong>{{n.name | filename}}</strong> &emsp;
        <span>Vom: <datepicker :monday-first="true" language="de" format="dd.MM.yyyy"></datepicker></span> &emsp;
        <span>bis: <datepicker :monday-first="true" language="de" format="dd.MM.yyyy"></datepicker></span>
      </div>
      <g-line-chart :data="n.data"></g-line-chart>
    </div>
  </div>
</template>

<script>
import gLineChart from './vchart/g-line-chart'
import Datepicker from 'vuejs-datepicker'

export default {
  name: 'charts',
  data () {
    return {
    }
  },
  methods: {
  },
  components: {
    gLineChart,
    Datepicker
  },
  mounted () {
  }
}
</script>

<style scoped lang="stylus">
.red
  color red

tCenter
  text-align center
.oneChart
  margin-bottom 1em

.vdp-datepicker input
  max-width 8em

.allInline, .allInline *
  display inline-flex

strong
  font-size large
</style>
