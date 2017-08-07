<template>
  <div id="wrapper">
    <schart canvasId="myCanvas"
    type="bar"
    width="800px"
    height="400px"
    :data="data"
    ></schart>
  </div>
</template>

<script>
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
//     this.data.map(() => { this.data.pop() })
    for (let i = this.data.length; i > 0; i--) {
      this.data.pop()
    }

    for (let n of this.$store.state.Accounts.selectedAcc) {
      //  let obj = {'name': n.anfangssaldo.buchungsdatum, value: n.anfangssaldo.value}
      //  this.data.push(obj)
      let obj2 = {'name': n.schlusssaldo.buchungsdatum, value: n.schlusssaldo.value}
      this.data.push(obj2)
    }
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
