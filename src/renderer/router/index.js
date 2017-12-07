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
      component: require('@/components/LandingPage').default
    },
    {
      path: '/management',
      name: 'account-management',
      component: require('@/components/AccountManagement').default
    },
    {
      path: '/sepas',
      name: 'Konten Details',
      component: require('@/components/AccountsDetails').default
    },
    {
      path: '/salden',
      name: 'Salden',
      component: require('@/components/Salden').default
    },
    {
      path: '/charts',
      name: 'Charts',
      component: require('@/components/charts').default
    }
  ]
})
