<template>
  <page-loader :loading="loading" class="my-page">

    <v-layout column v-if="mode == 'menu'">
      <v-flex xs2>
        <h1 class="my-title">New Applet</h1>
      </v-flex>

      <v-flex>

        <!-- Mobile -->
        <v-layout row wrap v-if="$mq === 'xs' || $mq === 'sm'">
          <v-flex xs12>
            <v-layout row align-center justify-center>
              <h1 class="my-line">if</h1>
              <v-img :src="getLogoTrigger" aspect-ratio="1" max-width="100px" max-height="100px" @click="selectTrigger" class="my-holders" :style="{backgroundColor: '#' + bgTrigger}"></v-img>
            </v-layout>
          </v-flex>
          <v-flex xs12>
            <v-layout row align-center justify-center>
              <h1 class="my-line">then</h1>
              <v-img :src="getLogoReaction" aspect-ratio="1" max-width="100px" max-height="100px" @click="selectReaction" class="my-holders" :style="{backgroundColor: '#' + bgReaction}"></v-img>
            </v-layout>
          </v-flex>
        </v-layout>

        <!-- Desktop -->
        <v-layout row justify-center align-center v-else>
          <h1 class="my-line">if</h1>
          <v-img :src="getLogoTrigger" aspect-ratio="1" max-width="100px" max-height="100px" @click="selectTrigger" class="my-holders" :style="{backgroundColor: '#' + bgTrigger}"></v-img>
          <h1 class="my-line">then</h1>
          <v-img :src="getLogoReaction" aspect-ratio="1" max-width="100px" max-height="100px" @click="selectReaction" class="my-holders" :style="{backgroundColor: '#' + bgReaction}"></v-img>
        </v-layout>
      </v-flex>

      <v-flex xs2 md6 align-self-center>
        <v-btn class="white--text" color="#0099ff" round depressed large ripple @click="saveApplet">Submit</v-btn>
      </v-flex>
    </v-layout>



    <TriggerPicker v-else-if="mode === 'trigger'" @triggerSelected="pickTrigger" :services="services"/>
    <ReactionPicker v-else-if="mode === 'reaction'" @reactionSelected="pickReaction" :services="services"/>

  </page-loader>
</template>

<script>
import Api from '../Api'
import PageLoader from '../components/PageLoader'
import TriggerPicker from '../components/Applet/TriggerPicker'
import ReactionPicker from '../components/Applet/ReactionPicker'

export default {
  components: {
    TriggerPicker,
    ReactionPicker,
    PageLoader
  },
  data() {
    return {
      services: [],
      loading: true,
      mode: 'menu',
      bgTrigger: '',
      bgReaction: ''
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
    getLogoTrigger() {
      return this.$store.getters.isTriggerSelected ? Api.websiteURL + `/images/${this.$store.getters.getTriggerSelected.service}.png` : require('../assets/plus-blue.png')
    },
    getLogoReaction() {
      return this.$store.getters.isReactionSelected ? Api.websiteURL + `/images/${this.$store.getters.getReactionSelected.service}.png` : this.$store.getters.isTriggerSelected ? require('../assets/plus-blue.png') :  require('../assets/plus.png')
    }
  },
  methods: {
    selectTrigger() {
      this.mode = 'trigger'
    },
    selectReaction() {
      if (this.$store.getters.isTriggerSelected != false) {
        this.mode = 'reaction'
      }
    },
    pickTrigger(trigger) {
      this.$store.dispatch('selectTrigger', trigger)
      this.bgTrigger = this.findInServices(this.$store.getters.getTriggerSelected.service)
      this.mode = 'menu'
    },
    pickReaction(reaction) {
      this.$store.dispatch('selectReaction', reaction)
      this.bgReaction = this.findInServices(this.$store.getters.getReactionSelected.service)
      this.mode = 'menu'
    },
    saveApplet() {
      if (this.$store.getters.isTriggerSelected && this.$store.getters.isReactionSelected) {
        this.$store.dispatch('publishApplet')
        .then(resp => console.log('success'))
        .catch(e => console.log('failure'))
      }
    },
    findInServices(name) {
      let service = this.services.find(x => x.nameService == name)
      return service.color
    }
    // findTriggerTitle(serviceName, triggerName) {
    //   let service = this.services.find(x => x.nameService == serviceName)
    //   let trigger = service.triggers.find(x => x.name == triggerName)
    //   return trigger.infos.title // description
    // },
    // findReactionTitle(serviceName, reactionName) {
    //   let service = this.services.find(x => x.nameService == serviceName)
    //   let reaction = service.reactions.find(x => x.name == reactionName)
    //   return reaction.infos.title // description
    // }
  }
}
</script>

<style scoped>
.my-page {
  background-color: white !important;
  color: black !important;
}

.my-title {
  font-size: 32px;
  text-align: center;
}

.my-line {
  padding: 20px;
  font-size: 92px;
  text-align: center;
}

.desc-app {
  color: white;
  text-align: center;
  line-height: 100px;
  font-size: 32px;
  height: 100px;
}

.my-holders {
  cursor: pointer;
}
</style>
