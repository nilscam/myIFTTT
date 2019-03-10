<template>
  <div class="form">
    google Success
  </div>

</template>

<script>
export default {
  mounted() {
    var token = this.$route.query.token
    if (token) {
      this.$store.dispatch('setToken', token)
    }
    this.$router.push('/')
  }
}
</script>

<style scoped>
</style>
