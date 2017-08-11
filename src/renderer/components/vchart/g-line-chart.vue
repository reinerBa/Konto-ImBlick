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
      chartInst: []
    }
  },
  props: {
    data: {
      type: Array,
      default: []
    },
    options: {
      type: Object,
      required: false
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.renderChart();
    })
  },
  destroyed () {
  //  delete this.chartInst[0]
  },
  methods: {
    renderChart () {
      let data = new google.visualization.DataTable()
      data.addColumn('date', 'X')
      data.addColumn('number', 'Betrag')

      data.addRows(this.data)
      var options = {
        hAxis: {
          title: 'Time'
        },
        vAxis: {
          title: 'Popularity'
        }
      }

      var chart = new google.visualization.LineChart(this.$refs.gChart)
      chart.draw(data, options)
    }
  },
  watch: {
    'data': function () {
      this.renderChart()
    },
    'options': function () {
      this.renderChart()
    }
  }
}
</script>
