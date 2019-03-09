<template>
  <page-loader :loading="loading" loaderColor="#ffffff">
    <v-layout column>

      <v-flex xs1 align-self-center class="my-header">
        <h1>Account settings</h1>
      </v-flex>
      <v-flex xs1/>

      <v-flex xs2>
        <v-layout column align-center>
          <v-layout column align-start class="section">
            <div class="section-header">
              <h1>Linked accounts</h1>
              <span>You must link your accounts to use these services</span>
            </div>

            <div class="btn-google" v-for="service in servicesConnections">
              <a :href="`/api/user/${service.service}/auth`">
                <v-layout row align-center justify-start>
                  <img :src="getLogo(service.service)" alt="G+" height="50" width="50" :style="{backgroundColor: '#' + service.color}">
                  <span class="login-google-text" v-if="service.isConnect">Connected to {{service.service}} with {{ service.username }}</span>
                  <span class="login-google-text" v-else>{{service.service}} is not linked</span>
                  <v-spacer/>
                  <span class="text-link">{{ service.isConnect ? 'Unlink' : 'Link'}}</span>
                </v-layout>
              </a>
            </div>

          </v-layout>
        </v-layout>
      </v-flex>

      <!-- <div class="service-link" v-for="service in servicesConnections">
        <v-layout row justify-center>
          <div class="btn-google">
            <a href="/api/user/google/auth">
              <v-layout row align-center justify-start>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" alt="G+" height="50" width="50">
                <span class="login-google-text">Login with Google</span>
                <span class="text-link">Link</span>
              </v-layout>
            </a>
          </div>
        </v-layout>
      </div> -->


    </v-layout>
  </page-loader>
</template>

<script>
import PageLoader from '../components/PageLoader'
import Api from '../Api'

export default {
  components: {
    PageLoader
  },
  data() {
    return {
      loading: true,
      servicesConnections: []
    }
  },
  mounted() {
    Api.getUserInfos()
    .then(resp => {
      this.servicesConnections = resp.data.authenticate
      console.log(this.servicesConnections);
      this.loading = false
    })
    .catch(err => console.error(err))
  },
  methods: {
    getLogo(name) {
      return  Api.websiteURL + `/images/${name}.png`
    }
  }
}
</script>

<style scoped>

.my-header {
  font-size: 20px;
  border-bottom: 2px solid rgba(255, 255, 255, .5);;
}

.service-link {
  padding: 6px;
}

.section {
  border: 2px solid white;
  padding: 20px;
  border-radius: 8px;
}

.section-header {
  padding-bottom: 20px;
}


.btn-google {
  width: 100%;
  background-color: white;
  padding: 10px;
  margin-bottom: 12px;
  border-radius: 4px;
}
.login-google-text {
  margin-left: 20px;
  font-size: 20px;
  font-family: 'Montserrat', sans-serif !important;
  color: black;
}
.text-link {
  margin-left: 20px;
  padding-right: 20px;
  font-size: 20px;
}

</style>
