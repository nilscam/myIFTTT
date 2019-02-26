<template>
  <v-card flat tile class="d-flex" :color="'#' + applet.reaction.infos.color" :class="{ 'white--text': isColorDark, 'black--text': !isColorDark, 'my-card': true }">
    <v-card-title primary-title>
      <div class="headline">{{ applet.reaction.infos.title }}</div>
      <span>{{ applet.reaction.infos.description }}</span>
    </v-card-title>
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
  },
  computed: {
    isColorDark() {
      var rgb = parseInt(this.applet.reaction.infos.color, 16);   // convert rrggbb to decimal
      var r = (rgb >> 16) & 0xff;  // extract red
      var g = (rgb >>  8) & 0xff;  // extract green
      var b = (rgb >>  0) & 0xff;  // extract blue
      var brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
      return brightness < 130
    }
  }
}
</script>

<style scoped>
</style>
