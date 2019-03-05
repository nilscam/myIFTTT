<template>
  <v-container grid-list-sm fluid class="icons-container">
    <icons-list v-if="service == undefined" :servicesDisplay="servicesDisplay" @serviceClicked="serviceSelected"/>
    <reaction-list v-else :service="service" @back="service = undefined" @reactionClicked="reactionSelected"/>
  </v-container>
</template>

<script>
import IconsList from './IconsList'
import ReactionList from './ReactionList'

export default {
  props: {
    services: {
      type: Array,
      required: true
    }
  },
  components: {
    IconsList,
    ReactionList
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
    reactionSelected(name, params) {
      let reaction = { service: this.service.nameService, name, params }
      this.$emit('reactionSelected', reaction)
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
