import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import NotFound from './views/errors/NotFound'
import InternError from './views/errors/InternError'
import Home from './views/Home.vue'
import Login from './views/Authentification/Login.vue'
import Register from './views/Authentification/Register.vue'
import GoogleSuccess from './views/Authentification/GoogleSuccess.vue'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    { path: '*', redirect: '/404' },
    { path: '/404', name: 'NotFound', component: NotFound },
    { path: '/500', name: 'InternError', component: InternError },
    { path: '/', redirect: '/home' },
    { path: '/home', name: 'home', component: Home },
    { path: '/login', name: 'login', component: Login },
    { path: '/register', name: 'register', component: Register },
    { path: '/about', name: 'about', component: () => import('./views/About.vue'), meta: { requiresAuth: true } },
    { path: '/profile', name: 'profile', component: () => import('./views/Profile.vue'), meta: { requiresAuth: true } },
    { path: '/newapplet', name: 'newapplet', component: () => import('./views/AppletCreator.vue'), meta: { requiresAuth: true } },
    { path: '/applets', name: 'applets', component: () => import('./views/UserApplets.vue'), meta: { requiresAuth: true } },
    { path: '/google/success', name: 'googlesuccess', component: GoogleSuccess }
  ]
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router
