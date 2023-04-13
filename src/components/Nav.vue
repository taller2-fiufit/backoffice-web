<template>
  <v-app-bar app clipped-left color="white" class="elevation-1" height="70">
      <v-app-bar-nav-icon @click="toggleSideBar"></v-app-bar-nav-icon>

      <v-img
        max-width="33"
        :src="require('@/assets/kinetix-logo.png')"
        alt="kinetix logo"
        class="ml-2 pointer"
        @click="redirect('Dashboard')"
      ></v-img>

      <v-img
        max-width="70"
        :src="require('@/assets/kinetix-name.png')"
        alt="kinetix name"
        class="ml-2 pointer"
        @click="redirect('Dashboard')"
      ></v-img>

      <template v-slot:append>
        <a href="javascript:void(0)" @click="logOut" class="nav-link" v-if="currentUser" style="color:#2a394c">Cerrar sesión</a>
      </template>
    </v-app-bar>
</template>

<script>

  export default {
    name: 'Nav',
    methods: {
      redirect (routeName) {
        this.$router.push({ name: routeName })
      },
      logOut() {
        this.$store.dispatch('auth/logout');
        this.$router.push('/login');
      },
      toggleSideBar() {
        this.$store.dispatch('sidebar/togglesidebar')
      }
    },
    computed: {
      currentUser() {
        return this.$store.state.auth.user;
      },
    },
  }
</script>