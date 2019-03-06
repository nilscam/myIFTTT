<template>
  <v-container fluid fill-height justify-center class="my-home-container">
    <v-layout column>
      <v-flex xs1>
      </v-flex>
      <v-flex xs2 align-self-center>
        <h2>Sign In</h2>
      </v-flex>
      <v-flex xs2 align-self-center>
        <input v-model="email" type="text" placeholder="Email" class="form-input"/>
      </v-flex>
      <v-flex xs2 align-self-center>
        <input v-model="password" type="password" placeholder="Password" class="form-input"/>
      </v-flex>
      <v-flex xs2 align-self-center>
        <v-btn @click="login" color="white" round>Login</v-btn>
      </v-flex>

      <v-flex xs2>
        <v-layout row justify-center>
          <v-flex xs10 class="btn-google">
            <a href="/api/user/google/auth">
            <v-layout row align-center justify-start>
              <v-img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" max-height="50px" max-width="50px" aspect-ratio="1"></v-img>
              <span class="login-google-text">Login with Google</span>
            </v-layout>
          </a>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: ""
    }
  },
  computed: {
    isLogged() {
      return this.$store.getters.isLoggedIn
    }
  },
  methods: {
    login() {
      let email = this.email
      let password = this.password
      this.$store.dispatch('login', { email, password })
      .then(() => this.$router.push('/'))
      .catch(err => console.log(err))
    }
  }
}
</script>

<style scoped>
.my-home-container {
  background-color: #0099ff;
  color: white;
  font-family: 'Montserrat', sans-serif !important;
}

.form-input {
  color: white;
  border-radius:25px;
  padding:15px 20px;
  background:rgba(255,255,255,.2);
}

.btn-google {
  background-color: white;
  padding: 10px;
  border-radius: 4px;
}
.login-google-text {
  margin-left: 20px;
  font-size: 20px;
  font-family: 'Montserrat', sans-serif !important;
  color: black;
}
</style>
