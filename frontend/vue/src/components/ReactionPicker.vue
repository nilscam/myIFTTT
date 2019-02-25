<template>
  <div>
    <div>
      ReactionPicker
    </div>
  </div>
</template>

<script>
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
  }
}
</script>

<style scoped>
</style>
