<template>
  <page-loader class="test" :loading="loading">
    <v-layout row wrap>
      <v-flex v-for="applet in applets" :key="applet.id" xs12 sm6 lg4 d-flex>
        <ActionCard :applet="applet" />
      </v-flex>
    </v-layout>
  </page-loader>
</template>

<script>
import Api from '../Api'
import PageLoader from '../components/PageLoader'
import ActionCard from '../components/Applet/ActionCard'

export default {
  components: {
    PageLoader,
    ActionCard
  },
  data() {
    return {
      applets: [],
      loading: true
    }
  },
  mounted() {
    Api.getApplets()
    .then(resp => {
      this.applets = resp.data
      this.loading = false
    })
    .catch(err => console.error(err))
  }
}
</script>

<style scoped>
.test {
  background-color: white !important;
  color: black !important;
}
</style>
