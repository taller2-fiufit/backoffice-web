<template>
  <v-app-bar color="green" class="flex-grow-0" app dark>
      <v-app-bar-title>Dashboard</v-app-bar-title>
  </v-app-bar>
  <div>
    <h3 v-if="user">Hi {{ user.fullname }}</h3>
    <h3 v-if="!user">You are not logged in</h3>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  
  export default {
    name: 'Dashboard',
    computed: {
      ...mapGetters(['user'])
    }
  }
</script>