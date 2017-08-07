import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage')
    },
    {
      path: '/management',
      name: 'account-management',
      component: require('@/components/AccountManagement')
    },
    {
      path: '/salden',
      name: 'salden',
      component: require('@/components/Salden')
    },
    {
      path: '/charts',
      name: 'charts',
      component: require('@/components/charts')
    }
  ]
})
