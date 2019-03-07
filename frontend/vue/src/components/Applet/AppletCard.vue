<template>
  <v-card @click="$emit('click')" class="my-card" min-height="200" :color="'#' + applet.infos.color">
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
