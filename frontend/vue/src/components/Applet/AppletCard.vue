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
  },
  computed: {
    isColorDark() {
      var rgb = parseInt(this.applet.infos.color, 16);   // convert rrggbb to decimal
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
.my-card {
  border-radius: 13px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer !important;

  padding: 15px;
  margin: 10px;
}

.my-card-title {
  min-height: 150px;
}

.custom-title {
  font-family: 'Montserrat', sans-serif !important;
  font-weight: 1000;
  font-size: 20px !important;
  color: white;
}
.custom-description {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 18px !important;
  font-weight: 700;
  color: white;
  opacity: 0.80;
}
</style>
