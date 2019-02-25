<template>
  <v-container fluid fill-height justify-center class="my-app-container">
    <slot v-if="loading === false">
      <!-- Page Content will go here -->
    </slot>
    <pulse-loader v-else size="22px" class="center-loader"/>
  </v-container>
</template>


<script>
import PulseLoader from 'vue-spinner/src/PulseLoader'

export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  components: {
    PulseLoader
  }
}
</script>

<style scoped>
.my-app-container {
  align-items: start;
}

.center-loader {
  align-self: center;
}
</style>
