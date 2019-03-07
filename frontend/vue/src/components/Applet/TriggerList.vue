<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-btn color="white" round @click="$emit('back')">&lt; Back</v-btn>
    </v-flex>

    <v-flex xs12 class="text-triggers">
      <v-layout align-center justify-center>
        <v-img :src="getServiceLogo(service.nameService)" aspect-ratio="1" max-height="50px" max-width="50px" :style="{backgroundColor: '#' + service.color}"></v-img>
        <h1 class="my-title">Choose Trigger</h1>
      </v-layout>
    </v-flex>


    <v-flex
      v-for="trigger in service.triggers"
      :key="trigger.id"
      xs12
      sm6
      md4
      d-flex
    >

    <event-card :applet="trigger" @click="emitClick(trigger)"/>


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
  methods: {
    getServiceLogo(serviceName) {
      return Api.websiteURL + `/images/${serviceName}.png`
    },
    emitClick(trigger) {
      this.$emit('triggerClicked', trigger.name, {})
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
