<template>
  <div id="wrapper">
    <div ref="gChart"></div>
    <schart canvasId="myCanvas"
    type="bar"
    width="800px"
    height="400px"
    :data="data"
    ></schart>
  </div>
</template>

<script>
/* global google */
/* eslint no-undef: "error" */

import Schart from './vchart/vue-schart'
export default {
  name: 'charts',
  data () {
    return {
      data: [
        {name: '2014', value: 1342},
        {name: '2015', value: 2123},
        {name: '2016', value: 1654},
        {name: '2017', value: 1795}
      ]
    }
  },
  methods: {
  },
  components: {
    Schart
  },
  mounted () {
    for (let i = this.data.length; i > 0; i--)
      this.data.pop()

    var myRows = []
    for (let n of this.$store.state.Accounts.selectedAcc) {
      let obj2 = {'name': n.schlusssaldo.buchungsdatum, value: n.schlusssaldo.value}
      this.data.push(obj2)
      myRows.push([new Date(n.anfangssaldo.buchungsdatum), n.anfangssaldo.value])
      myRows.push([new Date(n.schlusssaldo.buchungsdatum), n.schlusssaldo.value])
    }

//    google.charts.load('current', {packages: ['corechart', 'line']})
    var data = new google.visualization.DataTable()
    data.addColumn('date', 'X')
    data.addColumn('number', 'Betrag')

/*    data.addRows([
      [0, 0], [1, 10], [2, 23], [3, 17], [4, 18], [5, 9]
    ])
*/
    data.addRows(myRows)
    var options = {
      hAxis: {
        title: 'Time'
      },
      vAxis: {
        title: 'Popularity'
      },
      explorer: { actions: ['dragToZoom', 'rightClickToReset'] }
    }

    var chart = new google.visualization.LineChart(this.$refs.gChart)
    chart.draw(data, options)
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
