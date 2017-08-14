import Vue from 'vue'

import App from './App'
import router from './router'
import store from './store'
import globalFilter from './globalVueFilter.js'
import globalDirectives from './globalDirectives.js'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

for (let fn in globalFilter)
  Vue.filter(fn, globalFilter[fn])
for (let fn in globalFilter)
  Vue.directive(fn, globalDirectives[fn])

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
  created () {
    this.$store.dispatch('init')
  }
}).$mount('#app')
