import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
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
    },
    {
      path: '/login',
      name: 'login',
      component: require('@/components/LandingPage/LoginForm').default
    }
  ]
})

const routerHistory = []
router.beforeEach((to, from, next) => {
  let hasEntry = routerHistory.filter((value) => value.path === from.path)
  if (!hasEntry.length) {
    routerHistory.push(from)
    if (routerHistory.length > 5) routerHistory.reverse().pop().reverse()
  }

  next()
})

export {routerHistory}
export default router
