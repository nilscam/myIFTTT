<template>
  <div>
    <!-- <div v-if="loading === false">
      <TriggerPicker v-if="makerStatus === 'trigger'" @triggerClicked="" :services="services"/>
      <ReactionPicker v-else-if="makerStatus === 'reaction'" @reactionClicked="" :services="services"/>
    </div> -->
    <div class="loading-box">
      <v-layout row wrap align-center>
        <v-flex>
          Hello I am center to vertically using "align-center".
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
import Api from '../Api'
import PulseLoader from 'vue-spinner/src/PulseLoader'
import TriggerPicker from '../components/TriggerPicker'
import ReactionPicker from '../components/ReactionPicker'

export default {
  components: {
    TriggerPicker,
    ReactionPicker,
    PulseLoader
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
      // this.loading = false
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
.loading-box {
  height: 100% !important;
}
</style>
