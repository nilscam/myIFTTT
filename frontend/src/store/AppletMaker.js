import Api from '../Api'

export default {
  state: {
    isTrigger: false,
    isReaction: false,
    triggerSelected: {},
    reactionSelected: {}
  },
  mutations: {
    createNewApplet(state) {
      state.isTrigger = false
      state.isReaction = false
      state.triggerSelected = {}
      state.reactionSelected = {}
    },
    chooseTrigger(state, trigger) {
      state.triggerSelected = trigger
      state.isTrigger = true
    },
    chooseReaction(state, reaction) {
      state.reactionSelected = reaction
      state.isReaction = true
    },
    appletCreated() {
    }
  },
  actions: {
    startNewApplet({commit}) {
      commit('createNewApplet')
    },
    selectTrigger({commit}, trigger) {
      commit('chooseTrigger', trigger)
    },
    selectReaction({commit}, reaction) {
      commit('chooseReaction', reaction)
    },
    publishApplet({commit, state}) {
      return new Promise((resolve, reject) => {
        Api.postNewApplet(state.triggerSelected, state.reactionSelected)
        .then(resp => {
          commit('appletCreated')
          resolve(resp)
        })
        .catch(err => {
          reject(err)
        })
      })
    }

  },
  getters : {
    getTriggerSelected: state => state.triggerSelected,
    getReactionSelected: state => state.reactionSelected,
    isTriggerSelected: state => state.isTrigger,
    isReactionSelected: state => state.isReaction
  }
}
