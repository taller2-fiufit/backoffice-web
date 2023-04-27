<template>
  <v-app-bar app clipped-left color="#2b3c4b" class="elevation-1" height="70">
      <v-app-bar-nav-icon @click="toggleSideBar"></v-app-bar-nav-icon>

      <v-img
        max-width="33"
        :src="require('@/assets/login-logo.png')"
        alt="kinetix logo"
        class="ml-2 pointer"
        @click="redirect('Dashboard')"
      ></v-img>

      <v-img
        max-width="70"
        :src="require('@/assets/kinetix-name-white.png')"
        alt="kinetix name"
        class="ml-1 pointer"
        @click="redirect('Dashboard')"
      ></v-img>

      <template v-slot:append>
        <v-btn
          color="#9ACD32"
          icon
          size="x-large"
          @click="logOut"
          class="ml-12"
        >
          <v-icon>
            mdi-logout
          </v-icon>
        </v-btn>
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