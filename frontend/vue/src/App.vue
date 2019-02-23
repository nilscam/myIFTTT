<template>
  <v-app>

    <!-- Desktop -->
    <!-- <mq-layout mq="md+"> -->
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
        <v-container fluid fill-height >
                <v-layout
                  justify-center
                  align-center
                >
                  <v-flex text-xs-center fill-height>
                      <v-card class="elevation-20" height='100%'>
                      <v-toolbar dark color="primary">
                        <v-toolbar-title>I want this to take up the whole space with slight padding</v-toolbar-title>
                        <v-spacer></v-spacer>
                      </v-toolbar>
                      <v-card-text>

                      </v-card-text>

                    </v-card>
                  </v-flex>
                </v-layout>
              </v-container>
      </v-content>

    <!-- </mq-layout> -->





    <!-- Mobile -->
    <mq-layout :mq="['xs', 'sm']">
      <v-bottom-nav app :active.sync="bottomNav" :value="true" fixed color="white" v-if="$mq === 'sm' || $mq === 'xs'">
        <v-btn color="teal" flat value="activity" to="/about">
          <span>Activity</span>
          <v-icon>subject</v-icon>
        </v-btn>
        <v-btn color="teal" flat value="applets" to="/services">
          <span>My Applets</span>
          <v-icon>view_list</v-icon>
        </v-btn>
        <v-btn color="teal" flat value="profile" to="/profile">
          <span>Profile</span>
          <v-icon>account_circle</v-icon>
        </v-btn>
      </v-bottom-nav>

      <v-content>
        <transition :name="transitionName" mode="out-in">
          <keep-alive>
            <router-view/>
          </keep-alive>
        </transition>
      </v-content>
    </mq-layout>








  </v-app>
</template>

<script>
import UserToolBar from './components/UserToolBar.vue'

export default {
  name: 'App',
  components: {
    UserToolBar
  },
  data () {
    return {
      bottomNav: 'applets',
      transitionName: 'fade' // for mobile only
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
