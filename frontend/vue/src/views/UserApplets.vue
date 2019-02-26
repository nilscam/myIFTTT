<template>
  <page-loader :loading="loading">
    <v-layout row wrap>
      <v-flex v-for="applet in applets" :key="applet.id" xs12 sm6 lg4 d-flex>
        <applet-card :applet="applet" />
      </v-flex>
    </v-layout>
  </page-loader>
</template>

<script>
import AppletCard from '../components/Applet/AppletCard'
import Api from '../Api'
import PageLoader from '../components/PageLoader'

export default {
  components: {
    PageLoader,
    AppletCard
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
      console.log(resp);
      this.applets = resp.data
      this.loading = false
    })
    .catch(e => console.err(e))
  }
}
</script>

<style scoped>
</style>
