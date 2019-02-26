<template>
  <div>
    {{ $route.params.serviceName }}
  </div>
</template>

<script>
import Api from '../Api'

export default {
  mounted() {
    Api.getServices()
    .then(resp => {
      console.log(resp);
    })
    .catch(err => {
      console.log(err);
    })
  }
}
</script>

<style scoped>
</style>
