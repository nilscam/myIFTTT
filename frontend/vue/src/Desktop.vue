<template>
  <v-app>
    <v-toolbar app>

      <v-toolbar-title class="headline text-uppercase">
      <router-link :to="{ name: 'home' }">
        <span>AREA</span>
      </router-link>
      </v-toolbar-title>
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
        <keep-alive>
          <router-view/>
        </keep-alive>
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
  text-decoration: none;
}

.text-toolbar {
  font-weight: 600;
  color: rgb(60, 60, 60);
  cursor: pointer;
  font-size: 16px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .2s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0
}

</style>
