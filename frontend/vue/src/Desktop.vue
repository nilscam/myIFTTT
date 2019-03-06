<template>
  <v-app>
    <v-toolbar app flat color="#0099ff">

      <v-toolbar-title class="my-title headline text-uppercase white--text">
        <router-link :to="{ name: 'home' }">
          <span>AREA</span>
        </router-link>
      </v-toolbar-title>


      <v-toolbar-items  v-if="isLogged">
        <router-link :to="{ name: 'about' }">
          <v-layout justify-center align-center fill-height>
            <v-icon color="white" medium>apps</v-icon>
            <span class="text-toolbar">My Applets</span>
          </v-layout>
        </router-link>

        <div class="my-spacer"></div>

        <router-link :to="{ name: 'about' }">
          <v-layout justify-center align-center fill-height>
            <v-icon color="white" medium>subject</v-icon>
            <span class="text-toolbar">Activity</span>
          </v-layout>
        </router-link>
      </v-toolbar-items>

      <v-spacer></v-spacer>

      <div v-if="isLogged">
        <UserToolBar/>
      </div>

      <div v-else>
        <router-link :to="{ name: 'login' }">
          <span class="text-toolbar">Sign In</span>
        </router-link>

        <router-link :to="{ name: 'register' }">
          <v-btn color="info" round>Sign Up</v-btn>
        </router-link>
      </div>

    </v-toolbar>

    <v-content>
      <transition name="fade">
        <!-- <keep-alive> -->
          <router-view/>
        <!-- </keep-alive> -->
      </transition>
    </v-content>
  </v-app>
</template>


<script>
import UserToolBar from './components/UserToolBar.vue'

export default {
  name: 'Desktop',
  components: {
    UserToolBar
  },
  computed: {
    isLogged() {
      return this.$store.getters.isLoggedIn
    },
    username() {
      return this.$store.getters.userName
    }
  }
}
</script>

<style scoped>
a {
  color: inherit;
  text-decoration: none;
}

.my-title {
  padding-right: 50px;
  font-family: 'Montserrat', sans-serif !important;
}

.my-spacer {
  padding: 15px;
}

.text-toolbar {
  padding-left: 10px;
  font-weight: 600;
  font-family: 'Montserrat', sans-serif !important;
  color: rgb(255, 255, 255);
  cursor: pointer;
  font-size: 18px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .2s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0
}

</style>
