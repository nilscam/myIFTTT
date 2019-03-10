<template>
  <page-loader class="test" :loading="loading">
    <v-layout column align-center>
      <h1 class="my-title">Account activity</h1>
      <v-flex v-for="activity in activitys" :key="activity.id" xs12 sm6 lg4 d-flex>
        <ActivityCard :activity="activity" />
      </v-flex>
    </v-layout>
  </page-loader>
</template>

<script>
import Api from '../Api'
import PageLoader from '../components/PageLoader'
import ActivityCard from '../components/Applet/ActivityCard'

export default {
  components: {
    PageLoader,
    ActivityCard
  },
  data() {
    return {
      activitys: [],
      loading: true
    }
  },
  mounted() {
    Api.getActivitys()
    .then(resp => {
      this.activitys = resp.data
      this.loading = false
    })
    .catch(err => console.error(err))
  }
}
</script>
<style scoped>

.my-title {
  font-family: 'Montserrat', sans-serif !important;
  margin-top: 50px !important;
  font-size: 3em;
  color: #0099ff;
}

.test {
  background-color: white !important;
  color: black !important;
}

</style>