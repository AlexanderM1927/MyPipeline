import Vue from 'vue'
import VueRouter from 'vue-router'
import FullCalendar from 'vue-full-calendar'
import routes from './routes'
import NotificationService from '../services/NotificationService'

Vue.use(VueRouter)
Vue.use(FullCalendar)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: 'history',
    base: process.env.VUE_ROUTER_BASE
  })
  Router.beforeEach(async (to, from, next) => {
    document.title = to.meta.title
    // si es logout
    if (to.name === 'logout') {
      try {
        if (localStorage.getItem('token') !== null && localStorage.getItem('token') !== undefined) await NotificationService.dropToken({ token: localStorage.getItem('token') })
        localStorage.removeItem('user')
        localStorage.removeItem('token')
      } catch (error) {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
      }
      location.href = 'login'
    }

    const reqSession = to.matched.some(route => route.meta.requireSession)

    if (!reqSession) {
      if (to.name === 'login' && localStorage.getItem('token')) {
        next({ name: 'calendar' })
      } else {
        next()
      }
    } else if (localStorage.getItem('token')) {
      next()
    } else {
      next({ name: 'login' })
    }
  })

  return Router
}
