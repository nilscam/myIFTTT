import Api from '../Api'

export default {
  state: {
    // status = 'trigger, reaction, validation'
    status: '',
    triggerSelected: {},
    reactionSelected: {}
  },
  mutations: {
    createNewApplet(state) {
      state.status = 'trigger'
    },
    chooseTrigger(state, trigger) {
      triggerSelected = trigger
      state.status = 'reaction'
    },
    chooseReaction(state, reaction) {
      reactionSelected = reaction
      state.status = 'validation'
    },
    appletCreated(state) {
      state.status = ''
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
    getMakerStatus: state => state.status,
    getTriggerSelected: state => state.triggerSelected,
    getReactionSelected: state => state.reactionSelected,
  }
}
