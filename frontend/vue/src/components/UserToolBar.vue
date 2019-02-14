<template>

  <v-menu transition="slide-y-transition" bottom offset-y>

    <v-chip slot="activator">
      <v-avatar>
        <img src="https://randomuser.me/api/portraits/men/35.jpg" alt="trevor">
      </v-avatar>
      Nils
      <v-icon right>keyboard_arrow_down</v-icon>
    </v-chip>


    <!-- <v-btn slot="activator" class="purple" color="primary" dark>
      Slide Y Transition
    </v-btn> -->


    <v-list>
      <v-list-tile v-for="(item, i) in items" :key="i" @click="">
        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-menu>

</template>

<script>
export default {
  data: () => ({
    items: [
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me 2' }
    ]
  })
}
</script>

<style lang="css">
</style>
