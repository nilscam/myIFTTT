<template>
  <v-layout row wrap>
    <v-flex
      v-for="service in servicesDisplay"
      :key="service.id"
      xs4
      sm3
      md2
      d-flex
      class="service-icon"
    >
      <v-card flat tile class="d-flex" color="transparent" :title="service.name">

        <v-img
          @click="emitClick(service.name)"
          :src="getServiceLogo(service.name)"
          aspect-ratio="1"
          class="service-image"
          :style="{backgroundColor: '#' + service.color}"
        />

      </v-card>
    </v-flex>
    <v-flex
      v-for="service in fakeServices"
      :key="service.id"
      xs4
      sm3
      md2
      d-flex
      class="service-icon"
    >
      <v-card flat tile class="d-flex" color="transparent" :title="service">

        <v-img
          :src="getServiceLogo(service)"
          aspect-ratio="1"
          class="transparent lighten-2 service-image"
        >
          <v-layout
            slot="placeholder"
            fill-height
            align-center
            justify-center
            ma-0
          >
            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
          </v-layout>
        </v-img>

      </v-card>
    </v-flex>

  </v-layout>
</template>

<script>
import Api from '../../Api'

export default {
  props: {
    servicesDisplay: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      fakeServices: [
        'facebook',
        'google-plus',
        'line',
        'linkedin',
        'pinterest',
        'rss',
        'skype',
        'telegram',
        'vine',
        'whatsapp',
        'yammer',
        'youtube',
      ]
    }
  },
  methods: {
    getServiceLogo(service) {
      if (this.fakeServices.indexOf(service) < 0)
        return Api.websiteURL + `/images/${service}.png` //Todo la refaire pour les cards
      return Api.websiteURL + `/images/${service}.svg`
    },
    emitClick(service) {
      if (this.fakeServices.indexOf(service) < 0)
        this.$emit('serviceClicked', service)
    }
  }
}
</script>

<style>

.service-icon {
  transition: 0.3s;
  cursor: pointer;
}
.service-icon:hover {
  transform: scale(1.03);
}

.service-image {
  border-radius: 4px !important;
}

</style>
