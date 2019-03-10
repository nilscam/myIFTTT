<template>
  <v-card class="my-card" max-height="350" min-height="100" :color="'#' + (switcher ? applet.trigger.infos.color : 'BDC3C7')">
    <v-card-title primary-title>
      <v-flex>
        <v-layout row justify-center align-center>
          <h1 class="custom-title">{{applet.trigger.service}}</h1>
          <v-img :src="getLogoTrigger(applet.trigger.service)" aspect-ratio="1" max-width="50px" max-height="50px"></v-img>
          <h1 class="custom-title">{{applet.reaction.service}}</h1>
          <v-img :src="getLogoReaction(applet.reaction.service)" aspect-ratio="1" max-width="50px" max-height="50px"></v-img>
        </v-layout>
      </v-flex>
    </v-card-title>
    <v-card-text>
      <span class="custom-description">{{ applet.trigger.infos.description }}</span>
      <span class="custom-description">{{ applet.reaction.infos.description }}</span>
    </v-card-text>
      <v-card-actions class="pa-3">
        <v-switch
          v-on:change="activate"
          v-model="applet.trigger.isActive"
          color="green"
      ></v-switch>
      </v-card-actions>
  </v-card>
</template>

<script>
import Api from '../../Api'
export default {
  props: {
    applet: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      switcher: this.applet.trigger.isActive
    }
  },
  methods: {
    activate(e) {
      Api.postActivateApplet(this.applet.trigger.id, e)
      .then(resp => {this.switcher = !this.switcher})
      .catch(e => console.error(e))
    },
    getLogoTrigger(name) {
      return  Api.websiteURL + `/images/${name}.png`
    },
    getLogoReaction(name) {
      return Api.websiteURL + `/images/${name}.png`
    },
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
  min-height: 100px;
}

.custom-title {
  font-family: 'Montserrat', sans-serif !important;
  font-weight: 1000;
  font-size: 20px !important;
  color:white;
}
.custom-description {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 18px !important;
  font-weight: 700;
  color:white;
  opacity: 0.80;
}
::ng-deep .accent--text {
    color: red !important;
    caret-color: red !important;
}
</style>
