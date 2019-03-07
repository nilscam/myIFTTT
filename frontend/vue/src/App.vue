<template>
  <div>
    <Mobile v-if="$mq === 'xs' || $mq === 'sm'" class="my-app-container my-mobile"/>
    <Desktop v-else class="my-app-container my-desktop"/>
  </div>
</template>

<script>
import Mobile from './Mobile'
import Desktop from './Desktop'

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
.my-app-container {
  background-color:  #0099ff !important;
  color: white !important;
  font-family: 'Montserrat', sans-serif !important;
}
</style>
