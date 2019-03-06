<template>
  <div class="form">
    <form class="login" @submit.prevent="login">
      <h1>Sign in</h1>
      <input required v-model="email" type="text" placeholder="Email"/>
      <input required v-model="password" type="password" placeholder="Password"/>
      <button type="submit">Login</button>
    </form>

    <a href="/api/user/google/auth">google </a>
  </div>

</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: ""
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
</style>
