<template>
  <div class="">
    <IconList @serviceClicked="goToService"/>
  </div>
</template>

<script>
import Api from '../Api'
import IconList from '../components/IconsList'

export default {
  components: {
    IconList
  },
  mounted() {
    Api.getServices().then(resp => {
    console.log(resp);
    }).catch(e => console.err(e))
  },
  methods: {
    goToService(serviceName) {
      this.$router.push({ name: 'service', params: { serviceName: serviceName }})
    }
  }
}
</script>

<style>
</style>
