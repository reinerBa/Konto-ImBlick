<template>
    <div>
        <canvas :id="canvasId" :width="width" :height="height"></canvas>
    </div>
</template>

<script>
import SChart from 'schart.js'
export default {
  data: function () {
    return {
      chartInst: []
    }
  },
  props: {
    canvasId: {
      type: String,
      default: ''
    },
    width: {
      type: [String, Number],
      default: 500
    },
    height: {
      type: [String, Number],
      default: 400
    },
    type: {
      type: String,
      default: 'bar'
    },
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
      this.renderChart()
    })
  },
  destroyed () {
    delete this.chartInst[0]
  },
  methods: {
    renderChart: function () {
      var self = this
      var xxx = new SChart(self.canvasId, self.type, self.data, self.options)
      this.chartInst.push(xxx)
    }
  },
  watch: {
    'data': function () {
      this.renderChart()
    },
    'options': function () {
      this.renderChart()
    },
    'type': function () {
      this.renderChart()
    },
    'width': function () {
      var self = this
      self.$nextTick(function () {
        self.renderChart()
      })
    },
    'height': function () {
      var self = this
      self.$nextTick(function () {
        self.renderChart()
      })
    }
  }
}
</script>
