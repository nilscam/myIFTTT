<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-btn color="white" round @click="clickBack">&lt; Back</v-btn>
    </v-flex>

    <v-flex xs12 class="text-triggers">
      <v-layout align-center justify-center>
        <v-img :src="getServiceLogo(service.nameService)" aspect-ratio="1" max-height="50px" max-width="50px" :style="{backgroundColor: '#' + service.color}"></v-img>
        <h1 class="my-title">Choose Trigger</h1>
      </v-layout>
    </v-flex>


    <v-flex v-if="mode == 'select'" v-for="trigger in service.triggers" :key="trigger.id" xs12 sm6 md4 d-flex>
      <event-card :applet="trigger" @click="triggerClicked(trigger)"/>
    </v-flex>

    <v-flex v-if="mode == 'edit'">
      <v-layout align-center justify-center>
        <event-card :applet="triggerSelected" @validate="validate" mode="edit"/>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import EventCard from './EventCard'
import Api from '../../Api'

export default {
  props: {
    service: {
      type: Object,
      required: true
    }
  },
  components: {
    EventCard
  },
  data() {
    return {
      mode: 'select',
      triggerSelected: null
    }
  },
  methods: {
    getServiceLogo(serviceName) {
      return Api.websiteURL + `/images/${serviceName}.png`
    },
    clickBack() {
      if (this.mode == 'select') {
        this.$emit('back')
      } else {
        this.mode = 'select'
      }
    },
    validate(params) {
      this.$emit('triggerClicked', this.triggerSelected.name, params)
    },
    triggerClicked(trigger) {
      this.triggerSelected = trigger
      this.mode = 'edit'
    }
  }
}
</script>

<style scoped>
.text-triggers {
  padding-top: 20px !important;
  padding-bottom: 30px !important;
}

.my-title {
  font-family: 'Montserrat', sans-serif !important;
  padding-left: 10px;
}
</style>
