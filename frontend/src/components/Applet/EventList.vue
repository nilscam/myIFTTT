<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-btn color="white" round @click="clickBack">&lt; Back</v-btn>
    </v-flex>

    <v-flex xs12 class="text-events">
      <v-layout align-center justify-center>
        <v-img :src="getServiceLogo(service.nameService)" aspect-ratio="1" max-height="50px" max-width="50px" :style="{backgroundColor: '#' + service.color}"></v-img>
        <h1 class="my-title">Choose {{ eventType == 'triggers' ? 'Trigger' : 'Reaction' }}</h1>
      </v-layout>
    </v-flex>


    <v-flex v-if="mode == 'select'" v-for="event in service[eventType]" :key="event.id" xs12 sm6 md4 d-flex>
      <event-card :applet="event" @click="eventClicked(event)"/>
    </v-flex>

    <v-flex v-if="mode == 'edit'">
      <v-layout align-center justify-center>
        <event-card :applet="eventSelected" @validate="validate" mode="edit"/>
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
    },
    eventType: {
      type: String,
      required: true
    }
  },
  components: {
    EventCard
  },
  data() {
    return {
      mode: 'select',
      eventSelected: null
    }
  },
  mounted() {
    console.log(this.service)
    console.log(this.eventType)
    console.log(this.service[this.eventType])
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
      this.$emit('eventClicked', this.eventSelected.name, params)
    },
    eventClicked(e) {
      this.eventSelected = e
      this.mode = 'edit'
    }
  }
}
</script>

<style scoped>
.text-events {
  padding-top: 20px !important;
  padding-bottom: 30px !important;
}

.my-title {
  font-family: 'Montserrat', sans-serif !important;
  padding-left: 10px;
}
</style>
