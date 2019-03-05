<template>
  <div>
    <Mobile v-if="$mq === 'xs' || $mq === 'sm'"/>
    <Desktop v-else/>
  </div>
</template>

<script>
import Mobile from './Mobile'
import Desktop from './Desktop'
import UserToolBar from './components/UserToolBar.vue'

export default {
  name: 'App',
  components: {
    Mobile,
    Desktop
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
