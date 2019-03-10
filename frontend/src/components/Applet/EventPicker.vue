<template>
  <v-container grid-list-sm fluid class="icons-container">
    <icons-list v-if="service == undefined" :servicesDisplay="servicesDisplay" @serviceClicked="serviceSelected"/>
    <event-list v-else :service="service" @back="service = undefined" @eventClicked="eventSelected" :eventType="eventType"/>
  </v-container>
</template>

<script>
import IconsList from './IconsList'
import EventList from './EventList'

export default {
  props: {
    services: {
      type: Array,
      required: true
    },
    eventType: {
      type: String,
      required: true
    }
  },
  components: {
    IconsList,
    EventList
  },
  data() {
    return {
      service: undefined
    }
  },
  computed: {
    servicesDisplay() { return this.services.map(x => { return { name: x.nameService, color: x.color }}) }
  },
  methods: {
    serviceSelected(name) {
      this.service = this.services.find(x => x.nameService === name)
    },
    eventSelected(name, params) {
      let event = { service: this.service.nameService, name, params }
      this.$emit('eventSelected', event)
    }
  }
}
</script>

<style scoped>
.icons-container {
  padding: 0px;
  margin: 0;
}
</style>
