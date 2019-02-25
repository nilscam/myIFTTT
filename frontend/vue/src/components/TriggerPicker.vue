<template>
  <div>
    <div>
      TriggerPicker
      <div v-for="service in services">
        {{ service.displayName }}
      </div>
    </div>
  </div>
</template>

<script>
import Api from '../Api'

export default {
  props: {
    services: {
      type: Array,
      required: true
    }
  },


  mounted() {
    console.log('toto');
    console.log(this.services);
    console.log(Api.websiteURL);
  }
}
</script>

<style scoped>
</style>
