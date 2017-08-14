<template>
    <div ref="gChart">
    </div>
</template>

<script>
/* global google */
/* eslint no-undef: "error" */

export default {
  data: function () {
    return {
      chart: {},
      optionsDefault: {
        hAxis: {
          title: 'Time'
        },
        vAxis: {
          title: 'Popularity'
        },
        explorer: { actions: ['dragToZoom', 'rightClickToReset'] }
      }
    }
  },
  props: {
    data: {
      type: Array,
      default: [],
      required: true
    },
    options: {
      type: Object,
      required: false
    }
  },
  mounted: function () {
    this.chart = new google.visualization.LineChart(this.$refs.gChart)
    this.$nextTick(function () {
      this.renderChart()
    })
  },
  destroyed () {
    this.chart.clearChart()
  },
  methods: {
    renderChart () {
      if (this.options) {
        for (let key in this.options)
          this.optionsDefault[key] = this.options[key]
      }
      let chartData = new google.visualization.DataTable()
      chartData.addColumn('date', 'X')
      chartData.addColumn('number', 'Betrag')

      let myRows = []
      for (let n of this.data) {
        myRows.push([new Date(n.anfangssaldo.buchungsdatum), n.anfangssaldo.value])
        let value = n.anfangssaldo.value
        var sArray = [...n.saetze]
        for (let s of sArray) {
          value = value + s.value * (s.soll_haben === 'S' ? -1 : 1)
          myRows.push([new Date(s.datum), value])
        }

        myRows.push([new Date(n.schlusssaldo.buchungsdatum), n.schlusssaldo.value])
      }

      chartData.addRows(myRows)
      this.chart.draw(chartData, this.optionsDefault)
    }
  },
  watch: {
    data: 'renderChart',
    options: 'renderChart'
  }
}
</script>
