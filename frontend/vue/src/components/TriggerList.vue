<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-btn color="success" @click="$emit('back')">Back</v-btn>
    </v-flex>
    <v-flex
      v-for="trigger in triggers"
      :key="trigger.id"
      xs12
      sm6
      md4
      d-flex
    >
    <v-card flat tile class="d-flex" :color="'#' + trigger.infos.color" :class="isColorDark ? 'white--text' : 'black--text'">
      <v-card-title primary-title>
        <div class="headline">{{ trigger.infos.title }}</div>
        <span>{{ trigger.infos.description }}</span>
      </v-card-title>
    </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Api from '../Api'

export default {
  props: {
    triggers: {
      type: Array,
      required: true
    }
  },
  mounted() {
    console.log(this.triggers);

  },
  computed: {
    isColorDark() {
      var rgb = parseInt(this.triggers[0].infos.color, 16);   // convert rrggbb to decimal
      var r = (rgb >> 16) & 0xff;  // extract red
      var g = (rgb >>  8) & 0xff;  // extract green
      var b = (rgb >>  0) & 0xff;  // extract blue
      var brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
      return brightness < 130
    }
  },
  methods: {
    // getServiceLogo(service) {
    //   if (this.fakeServices.indexOf(service) < 0)
    //     return Api.websiteURL + `/images/${service}.png`
    //   return Api.websiteURL + `/images/${service}.svg`
    // },
    // emitClick(service) {
    //   console.log(this.fakeServices.indexOf(service));
    //   if (this.fakeServices.indexOf(service) < 0)
    //     this.$emit('serviceClicked', service)
    // }
  }
}
</script>

<style scoped>

</style>
