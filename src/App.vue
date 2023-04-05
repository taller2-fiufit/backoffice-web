<template>
  <v-app id="inspire">
    <!--
    <div v-if="user">
    -->
    <div>
      <Nav />
    </div>
    
    <!--
    <div v-if="user">
    -->
    <div>
      <SideBarMenu />
    </div>

    <!--
    ESTÁ MAL PORQUE TAMBIÉN DEBERÍA REGISTER
    <div v-if="!user">
      <Login />
    </div>
    -->

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
  import axios from 'axios'
  import { mapGetters } from 'vuex';
  import Nav from './components/Nav.vue'
  import SideBarMenu from './components/SidebarMenu.vue'

  export default {
    name: 'App',
    components: {
      Nav,
      SideBarMenu,
    },
    async created() {
      const response = await axios.get('user');
      this.$store.dispatch('user', response.data);
    },
    computed: {
      ...mapGetters(['user'])
    }
  }
</script>