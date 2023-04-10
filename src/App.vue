<template>
  <v-app id="inspire">

    <div v-if="currentUser">
      <Nav />
    </div>

    <div v-if="currentUser">
      <SideBarMenu />
    </div>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
  import Nav from './components/Nav.vue'
  import SideBarMenu from './components/SidebarMenu.vue'

  export default {
    name: 'App',
    components: {
      Nav,
      SideBarMenu,
    },
    computed: {
      currentUser() {
        return this.$store.state.auth.user;
      },
    },
  }
</script>