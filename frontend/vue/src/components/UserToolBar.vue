<template>

  <v-menu offset-y :nudge-bottom="10" left transition="scale-transition" origin="center center">
    <v-btn icon large flat slot="activator">
      <v-avatar size="30px">
        <img src="https://randomuser.me/api/portraits/women/70.jpg" alt="Michael Wang"/>
      </v-avatar>
    </v-btn>
    <v-list class="pa-0">
      <v-list-tile v-for="(item,index) in items" :to="!item.href ? { name: item.name } : null" @click="item.click" ripple="ripple" :disabled="item.disabled" :target="item.target" rel="noopener" :key="index">
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
          click: () => {
            this.$router.push({ name: 'newapplet' })
          }
        },
        {
          icon: 'description',
          href: '#',
          title: 'Applets',
          click: () => {
            this.$router.push({ name: 'applets' })
          }
        },
        {
          icon: 'account_circle',
          href: '#',
          title: 'Profile',
          click: () => {
            this.$router.push({ name: 'profile' })
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
