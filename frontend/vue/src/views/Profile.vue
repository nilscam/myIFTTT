<template>
  <page-loader :loading="loading" loaderColor="#ffffff">
    <v-layout column>

      <v-flex xs1/>
      <v-flex xs3 align-self-center>
        <h1>Profile</h1>
      </v-flex>

      <v-flex xs2 v-for="service in servicesConnections">
      </v-flex>



    </v-layout>
    <!-- <div>
      Profile
    </div> -->
  </page-loader>
</template>

<script>
import PageLoader from '../components/PageLoader'

export default {
  components: {
    PageLoader
  },
  data() {
    return {
      loading: false,
      servicesConnections: []
    }
  }
}
</script>

<style scoped>
</style>
