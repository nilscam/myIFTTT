<template>
  <div class="form">
    <form class="login" @submit.prevent="login">
      <h1>Sign in</h1>
      <input required v-model="username" type="username" placeholder="Name"/>
      <input required v-model="password" type="password" placeholder="Password"/>
      <button type="submit">Login</button>
    </form>

  </div>

</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: ""
    }
  },
  methods: {
    login() {
      let username = this.username
      let password = this.password
      this.$store.dispatch('login', { username, password })
      .then(() => this.$router.push('/'))
      .catch(err => console.log(err))
    }
  }
}
</script>

<style scoped>
</style>
