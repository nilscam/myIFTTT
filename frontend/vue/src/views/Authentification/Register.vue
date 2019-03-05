<template>
  <div>
    <h4>Register</h4>
    <form @submit.prevent="register">
      <label for="name">Name</label>
      <div>
          <input id="email" type="text" v-model="email" required autofocus>
      </div>

      <label for="password">Password</label>
      <div>
          <input id="password" type="password" v-model="password" required>
      </div>

      <label for="password-confirm">Confirm Password</label>
      <div>
          <input id="password-confirm" type="password" v-model="password_confirmation" required>
      </div>

      <div>
          <button type="submit">Register</button>
      </div>
    </form>
  </div>
</template>


<script>
export default {
  data() {
    return {
      email : "",
      password : "",
      password_confirmation : ""
    }
  },
  methods: {
    register() {
      if (this.password == this.password_confirmation) {
        let email = this.email
        let password = this.password
        this.$store.dispatch('register', { email, password })
        .then(() => this.$router.push('/'))
        .catch(err => console.log(err))
      }
    }
  }
}
</script>

<style scoped>
</style>
