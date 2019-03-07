<template>
  <div class="form">
    google Success
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
  mounted() {
    var token = this.$route.query.token
    if (token) {
      this.$store.dispatch('setToken', token)
    }
    this.$router.push('/')
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
</style>
