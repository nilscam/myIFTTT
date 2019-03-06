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
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Montserrat:700');
a {
  text-decoration: none;
}
</style>
