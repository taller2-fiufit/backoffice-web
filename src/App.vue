<template>
  <v-app id="inspire">

    <div v-if="currentUser">
      <WebNav />
    </div>

    <div v-if="currentUser && showSideBar">
      <SideBarMenu />
    </div>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import WebNav from './components/Nav.vue'
import SideBarMenu from './components/SidebarMenu.vue'

export default {
  name: 'App',
  components: {
    WebNav,
    SideBarMenu
  },
  computed: {
    currentUser () {
      return this.$store.state.auth.user
    },
    showSideBar () {
      return this.$store.state.sidebar.sideBarOpen
    }
  }
}
</script>
