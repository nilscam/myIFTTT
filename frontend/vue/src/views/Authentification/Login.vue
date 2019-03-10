<template>
  <v-container fluid fill-height justify-center>
    <v-layout column>
      <v-flex xs2 md1 align-self-end>
        <v-btn round color="warning" v-if="$mq === 'xs' || $mq === 'sm'" to="/register">Create an Account</v-btn>
      </v-flex>
      <v-flex xs1 align-self-center>
        <h2>Sign In</h2>
      </v-flex>
      <v-flex xs2 md1 align-self-center>
        <input v-model="email" type="text" placeholder="Email" class="form-input"/>
      </v-flex>
      <v-flex xs2 md1 align-self-center>
        <input v-model="password" type="password" placeholder="Password" class="form-input"/>
      </v-flex>
      <v-flex xs2 align-self-center>
        <v-layout column>
          <v-btn @click="login" color="white" round>Login</v-btn>
        </v-layout>
      </v-flex>

      <v-flex xs2>
        <v-layout row justify-center>
          <div class="btn-google">
            <a href="/api/user/google/auth">
              <v-layout row align-center justify-start>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" alt="G+" height="50" width="50">
                <span class="login-google-text">Login with Google</span>
              </v-layout>
            </a>
          </div>
        </v-layout>
      </v-flex>
      <v-flex xs2>
        <v-layout row justify-center>
          <div class="btn-facebook">
            <a href="/api/user/google/auth">
              <v-layout row align-center justify-start>
                <img src="http://www.transparentpng.com/download/facebook/facebook-login-logo-hd-png-21.png" alt="Fb" height="50" width="50">
                <span class="login-facebook-text">Login with Facebook</span>
              </v-layout>
            </a>
          </div>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script>
export default {
  data() {
    return {
      type: 0,
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
      .catch(err => console.error(err))
    }
  }
}
</script>

<style scoped>

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

.btn-facebook {
  background-color: #3b5998;
  padding: 10px;
  border-radius: 4px;
}
.login-facebook-text {
  margin-left: 20px;
  font-size: 20px;
  font-family: 'Montserrat', sans-serif !important;
  color: white;
}

</style>
