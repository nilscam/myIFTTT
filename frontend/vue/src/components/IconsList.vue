<template>
  <v-layout>
    <!-- <v-flex xs12 sm6 offset-sm3> -->
    <v-flex xs12>
      <v-card flat>
        <v-container grid-list-sm fluid>
          <v-layout row wrap>
            <v-flex
              v-for="service in services"
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
                  class="white lighten-2 service-image"
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
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: {
    servicesName: {
      type: Array,
      required: true
    }
  }
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
  methods: {
    getServiceLogo(service) {
      // API URL
      return `http://127.0.0.1:3000/svg/${service}.svg`
    },
    emitClick(service) {
      console.log(this.takeServices.indexOf(service));
      if (this.takeServices.indexOf(service) < 0)
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
