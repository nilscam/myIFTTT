<template>
  <v-app>
    <v-bottom-nav app :active.sync="bottomNav" :value="true" fixed color="white" v-if="isLogged">
      <v-btn color="teal" flat value="applets" to="applets">
        <span>My Applets</span>
        <v-icon>view_list</v-icon>
      </v-btn>
      <v-btn color="teal" flat value="home" to="home">
        <span>Home</span>
        <v-icon>home</v-icon>
      </v-btn>
      <v-btn color="teal" flat value="profile" to="profile">
        <span>Profile</span>
        <v-icon>account_circle</v-icon>
      </v-btn>
    </v-bottom-nav>

    <v-content>
      <transition :name="transitionName" mode="out-in">
        <!-- <keep-alive> -->
          <router-view/>
        <!-- </keep-alive> -->
      </transition>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'Mobile',
  data () {
    return {
      bottomNav: 'home',
      transitionName: 'fade' // for mobile only
    }
  },
  computed: {
    isLogged() {
      return this.$store.getters.isLoggedIn
    }
  },
  watch: {
    '$route' (to, from) {
      const switchers = ['about', 'services', 'profile'];

      if (switchers.includes(to.name) && switchers.includes(from.name)) {
        if (switchers.indexOf(from.name) < switchers.indexOf(to.name)) {
          this.transitionName = 'slide-right'
        } else {
          this.transitionName = 'slide-left'
        }
      } else {
        this.transitionName = 'fade'
      }
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}


.fade-enter-active, .fade-leave-active {
  transition: opacity .2s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0
}



.slide-left-leave-active, .slide-left-enter-active {
  transition: 0.1s;
}
.slide-left-enter {
  transform: translate(-100%, 0);
}
.slide-left-leave-to {
  transform: translate(100%, 0);
}

.slide-right-leave-active, .slide-right-enter-active {
  transition: 0.1s;
}
.slide-right-enter {
  transform: translate(100%, 0);
}
.slide-right-leave-to {
  transform: translate(-100%, 0);
}

</style>
