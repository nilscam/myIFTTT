<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-btn color="success" @click="$emit('back')">Back</v-btn>
    </v-flex>
    <v-flex
      v-for="reaction in reactions"
      :key="reaction.id"
      xs12
      sm6
      md4
      d-flex
    >
    <v-card flat tile class="d-flex" :min-width="300" :max-width="600" :min-height="300" :max-height="600" :color="'#' + reaction.infos.color" :class="{ 'white--text': isColorDark, 'black--text': !isColorDark, 'my-card': true }" @click="emitClick(reaction)">
      <v-card-title primary-title>
        <div class="headline custom-title">{{ reaction.infos.title }}</div>
        <span class="custom-description">{{ reaction.infos.description }}</span>
      </v-card-title>
    </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: {
    reactions: {
      type: Array,
      required: true
    }
  },
  computed: {
    isColorDark() {
      var rgb = parseInt(this.reactions[0].infos.color, 16);   // convert rrggbb to decimal
      var r = (rgb >> 16) & 0xff;  // extract red
      var g = (rgb >>  8) & 0xff;  // extract green
      var b = (rgb >>  0) & 0xff;  // extract blue
      var brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
      return brightness < 130
    }
  },
  methods: {
    emitClick(reaction) {
      this.$emit('reactionClicked', reaction.name)
    }
  }
}
</script>

<style scoped>

.my-card { 
  border-radius: 13px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer !important;
}
.custom-title {
  font-family: 'Montserrat', sans-serif !important;
  font-weight: 1000;
  font-size: 34px !important;
  color: white;
}
.custom-description {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 20px !important;
  font-weight: 600;
  color: white;
  opacity: 0.50;
}
</style>
