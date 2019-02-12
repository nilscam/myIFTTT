import Vue from 'vue'
import Vuex from 'vuex'
import Api from './Api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user : {}
  },
  mutations: {
    auth_request(state){
       state.status = 'loading'
     },
     auth_success(state, token, user){
       state.status = 'success'
       state.token = token
       state.user = user
     },
     auth_error(state){
       state.status = 'error'
     },
     logout(state){
       state.status = ''
       state.token = ''
     }
  },
  actions: {
    login ({commit}, data) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        Api.login(data)
        .then(resp => {
          const token = resp.data.token
          const user = data.username
          localStorage.setItem('token', token)
          Api.setAuthorisationToken(token)
          commit('auth_success', token, user)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error')
          localStorage.removeItem('token')
          reject(err)
        })
      })
    },
    register({commit}, data){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        Api.register(data)
        .then(resp => {
          const token = resp.data.token
          const user = data.username
          localStorage.setItem('token', token)
          Api.setAuthorisationToken(token)
          commit('auth_success', token, user)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error')
          localStorage.removeItem('token')
          reject(err)
        })
      })
    },
    logout({commit}){
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('token')
        Api.removeAuthorisationToken()
        resolve()
      })
    }
  },
  getters : {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
  }
})
