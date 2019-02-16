import Vue from 'vue'
import './plugins/vuetify'
import './plugins/vueMq'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')