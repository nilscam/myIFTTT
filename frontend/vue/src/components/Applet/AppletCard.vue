<template>
  <!-- flat tile class="d-flex" :min-width="300" :max-width="600" :min-height="300" :max-height="600"  -->
  <v-card @click="$emit('click')" class="my-card" min-height="200" :color="'#' + applet.infos.color" :class="{'white--text': isColorDark, 'black--text': !isColorDark, 'my-card': true }">
    <v-card-title primary-title>
      <h2 class="custom-title">{{ applet.infos.title }}</h2>
    </v-card-title>
    <v-card-text>
      <span class="custom-description">{{ applet.infos.description }}</span>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    applet: {
      type: Object,
      required: true
    }
  },
  mounted() {
    console.log(this.applet);
  }
}
</script>

<style scoped>
</style>
