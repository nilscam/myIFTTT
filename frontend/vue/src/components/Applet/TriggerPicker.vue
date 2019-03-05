<template>
  <v-container grid-list-sm fluid class="icons-container">
    <icons-list v-if="service == undefined" :servicesDisplay="servicesDisplay" @serviceClicked="serviceSelected"/>
    <trigger-list v-else :service="service" @back="service = undefined" @triggerClicked="triggerSelected"/>
  </v-container>
</template>

<script>
import IconsList from './IconsList'
import TriggerList from './TriggerList'

export default {
  props: {
    services: {
      type: Array,
      required: true
    }
  },
  components: {
    IconsList,
    TriggerList
  },
  data() {
    return {
      service: undefined
    }
  },
  mounted() {
    console.log(this.services);
  },
  computed: {
    servicesDisplay() { return this.services.map(x => { return { name: x.nameService, color: x.color }}) }
  },
  methods: {
    serviceSelected(name) {
      this.service = this.services.find(x => x.nameService === name)
    },
    triggerSelected(name, params) {
      let trigger = { service: this.service.nameService, name, params }
      this.$emit('triggerSelected', trigger)
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
