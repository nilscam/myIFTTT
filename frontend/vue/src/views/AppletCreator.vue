<template>
  <page-loader :loading="loading">
    <TriggerPicker v-if="makerStatus === 'trigger'" @triggerClicked="" :services="services"/>
    <ReactionPicker v-else-if="makerStatus === 'reaction'" @reactionClicked="" :services="services"/>
    <v-btn v-else color="success">Create Applet</v-btn>
  </page-loader>
</template>

<script>
import Api from '../Api'
import PageLoader from '../components/PageLoader'
import TriggerPicker from '../components/TriggerPicker'
import ReactionPicker from '../components/ReactionPicker'

export default {
  components: {
    TriggerPicker,
    ReactionPicker,
    PageLoader
  },
  data() {
    return {
      services: [],
      loading: true
    }
  },
  mounted() {
    Api.getServices()
    .then(resp => {
      this.services = resp.data.services
      this.loading = false
    })
    .catch(e => console.err(e))
    this.$store.dispatch('startNewApplet')
  },
  computed: {
    makerStatus() {
      return this.$store.getters.getMakerStatus
    }
  },
  methods: {
    pickTrigger(trigger) {
      this.$store.dispatch('selectTrigger', trigger)
    },
    pickReaction(reaction) {
      this.$store.dispatch('selectReaction', reaction)
    },
    saveApplet() {

    }
  }
}
</script>

<style scoped>
.tata {
  align-self: stretch;
}
</style>
