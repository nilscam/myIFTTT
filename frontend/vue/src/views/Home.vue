<template>
  <v-container fluid fill-height justify-center class="my-home-container">
    <v-layout column>


      <v-flex xs2>
      </v-flex>

      <v-flex xs1 align-self-center>
        <h1>Area</h1>
      </v-flex>

      <v-flex xs1 align-self-center>
        <span>Automate Your Things</span>
      </v-flex>

      <v-flex xs6 align-self-center>
        <RobotCool/>
      </v-flex>

      <v-flex xs2 align-self-center v-if="!isLogged">
        <v-btn color="white" round large to="/login">Login Now</v-btn>
      </v-flex>

      <v-flex xs2 align-self-center v-else>
        <v-btn color="white" round large to="/newapplet">Create New Applet</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import RobotCool from '../components/Random/RobotCool'

export default {
  components: {
    RobotCool
  },
  computed: {
    isLogged() {
      return this.$store.getters.isLoggedIn
    }
  }
}
</script>

<style scoped>
.my-home-container {
  background-color: #0099ff;
  color: white;
  font-family: 'Montserrat', sans-serif !important;
}

</style>
