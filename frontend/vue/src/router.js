import Vue from 'vue'
import Router from 'vue-router'
import store from './store.js'
import Home from './views/Home.vue'
import Login from './views/Authentification/Login.vue'
import Register from './views/Authentification/Register.vue'

Vue.use(Router)

let router = new Router({
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/login', name: 'login', component: Login },
    { path: '/register', name: 'register', component: Register },
    { path: '/about', name: 'about', component: () => import('./views/About.vue'), meta: { requiresAuth: true } },
    { path: '/services', name: 'services', component: () => import('./views/ListServices.vue'), meta: { requiresAuth: true } },
    { path: '/service/:serviceName', name: 'service', component: () => import('./views/Service.vue'), meta: { requiresAuth: true } }
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
