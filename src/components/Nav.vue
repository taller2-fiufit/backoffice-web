<template>
  <v-app-bar app clipped-left color="white" class="elevation-1" height="70">
      <v-app-bar-nav-icon @click="toggleMenu"></v-app-bar-nav-icon>

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
        <router-link to="/login" class="nav-link" v-if="!user">Login</router-link>
        <router-link to="/register" class="nav-link" v-if="!user">Sign up</router-link>
        <a href="javascript:void(0)" @click="handleClick" class="nav-link" v-if="user">Logout</a>
      </template>
    </v-app-bar>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'Nav',
    methods: {
      redirect (routeName) {
        this.$router.push({ name: routeName })
      },
      handleClick() {
        localStorage.removeItem('token');
        this.$store.dispatch('user', null);
        this.$router.push('/login');
      }
    },
    computed: {
      ...mapGetters(['user'])
    }
  }
</script>