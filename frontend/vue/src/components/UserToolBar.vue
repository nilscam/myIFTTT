<template>

  <!-- <v-menu transition="slide-y-transition" bottom offset-y>

    <v-chip slot="activator">
      <v-avatar>
        <img src="https://randomuser.me/api/portraits/men/35.jpg" alt="trevor">
      </v-avatar>
      Nils
      <v-icon right>keyboard_arrow_down</v-icon>
    </v-chip>

    <v-list>
      <v-list-tile v-for="(item, i) in items" :key="i" @click="">
        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-menu> -->


  <v-menu offset-y :nudge-bottom="10" left transition="scale-transition" origin="center center">
    <v-btn icon large flat slot="activator">
      <v-avatar size="30px">
        <img src="https://randomuser.me/api/portraits/women/70.jpg" alt="Michael Wang"/>
      </v-avatar>
    </v-btn>
    <v-list class="pa-0">
      <v-list-tile v-for="(item,index) in items" :to="!item.href ? { name: item.name } : null" :href="item.href" @click="item.click" ripple="ripple" :disabled="item.disabled" :target="item.target" rel="noopener" :key="index">
        <v-list-tile-action v-if="item.icon">
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-menu>

</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      items: [
        {
          icon: 'note_add',
          href: '#',
          title: 'New Applet',
          click: (e) => {
            console.log(e);
          }
        },
        {
          icon: 'description',
          href: '#',
          title: 'Applets',
          click: (e) => {
            console.log(e);
          }
        },
        {
          icon: 'settings',
          href: '#',
          title: 'Settings',
          click: (e) => {
            console.log(e);
          }
        },
        {
          icon: 'power_settings_new',
          href: '#',
          title: 'Logout',
          click: (e) => {
            this.logout()
          }
        }
      ],
    }
  },
  methods: {
    ...mapActions(['logout'])
  }
}
</script>

<style lang="css">
</style>
