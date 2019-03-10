import Api from '../Api'
import router from '../router.js'

export default {
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user : {}
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
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
    setToken({commit}, token) {
      localStorage.setItem('token', token)
      Api.setAuthorisationToken(token)
      commit('setToken', token)
    },
    login ({commit}, data) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        Api.login(data)
        .then(resp => {
          const token = resp.data.token
          let user = { username: data.username }
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
          let user = { username: data.username }
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
      return new Promise((resolve) => {
        commit('logout')
        localStorage.removeItem('token')
        Api.removeAuthorisationToken()
        router.push({name: 'home'})
        resolve()
      })
    }
  },
  getters : {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    userName: state => state.user,
    getToken: state => state.token
  }
}
