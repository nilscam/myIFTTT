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
    <v-card flat tile class="d-flex" :color="'#' + trigger.infos.color" :class="{ 'white--text': isColorDark, 'black--text': !isColorDark, 'my-card': true }" @click="emitClick(trigger)">
      <v-card-title primary-title>
        <div class="headline">{{ trigger.infos.title }}</div>
        <span>{{ trigger.infos.description }}</span>
      </v-card-title>
    </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: {
    triggers: {
      type: Array,
      required: true
    }
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
    emitClick(trigger) {
      this.$emit('triggerClicked', trigger.name)
    }
  }
}
</script>

<style scoped>
.my-card {
  cursor: pointer !important;
}
</style>
