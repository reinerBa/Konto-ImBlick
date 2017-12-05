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
      path: '/sepas',
      name: 'Konten Details',
      component: require('@/components/AccountsDetails')
    },
    {
      path: '/salden',
      name: 'Salden',
      component: require('@/components/Salden')
    },
    {
      path: '/charts',
      name: 'Charts',
      component: require('@/components/charts')
    }
  ]
})
