import Vue from 'vue'
import Vuex from 'vuex'
import AuthModule from './AuthModule'
import AppletMaker from './AppletMaker'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth: AuthModule,
    appletMaker: AppletMaker
  }
})
