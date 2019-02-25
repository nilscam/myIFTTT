<template>
  <v-layout row wrap>
    <v-flex
      v-for="service in computeServices"
      :key="service.id"
      xs4
      sm3
      md2
      d-flex
      class="service-icon"
    >
      <v-card flat tile class="d-flex" color="transparent">

        <v-img
          @click="emitClick(service)"
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
import Api from '../Api'

export default {
  props: {
    servicesNames: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      fakeServices: [
        'facebook',
        'google-plus',
        'instagram',
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
  mounted() {
    console.log(this.fakeServices);
    console.log(this.computeServices);
  },
  computed: {
    computeServices() {
      return this.fakeServices.concat(this.servicesNames)
    }
  },
  methods: {
    getServiceLogo(service) {
      if (this.fakeServices.indexOf(service) < 0)
        return Api.websiteURL + `/images/${service}.png`
      return Api.websiteURL + `/images/${service}.svg`
    },
    emitClick(service) {
      console.log(this.fakeServices.indexOf(service));
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
