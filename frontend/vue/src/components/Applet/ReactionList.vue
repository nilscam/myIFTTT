<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-btn color="white" round @click="$emit('back')">< Back</v-btn>
    </v-flex>

    <v-flex xs12 class="text-reactions">
      <v-layout align-center justify-center>
        <!-- <div class="my-img-box"> -->
        <v-img :src="getServiceLogo(service.nameService)" aspect-ratio="1" max-height="50px" max-width="50px" :style="{backgroundColor: '#' + service.color}"></v-img>
        <!-- </div> -->
        <h1 class="my-title">Choose Reaction</h1>
      </v-layout>
    </v-flex>


    <v-flex
      v-for="reaction in service.reactions"
      :key="reaction.id"
      xs12
      sm6
      md4
      d-flex
    >

    <event-card :applet="reaction" @click="emitClick(reaction)"/>


    </v-flex>
  </v-layout>
</template>

<script>
import EventCard from './EventCard'
import Api from '../../Api'

export default {
  props: {
    service: {
      type: Object,
      required: true
    }
  },
  components: {
    EventCard
  },
  methods: {
    getServiceLogo(serviceName) {
      return Api.websiteURL + `/images/${serviceName}.png`
    },
    emitClick(reaction) {
      this.$emit('reactionClicked', reaction.name, {})
    }
  }
}
</script>

<style scoped>
.text-reactions {
  padding-top: 20px !important;
  padding-bottom: 30px !important;
}

.my-title {
  padding-left: 10px;
}
</style>
