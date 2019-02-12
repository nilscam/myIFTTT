<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>AREA</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link :to="{ name: 'home' }">
        <span class="mr-2">Home</span>
      </router-link>
      <router-link :to="{ name: 'login' }">
        <span class="mr-2">Login</span>
      </router-link>
    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data () {
    return {
      //
    }
  }
}
</script>
