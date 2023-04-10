<!--<template>
  <v-app-bar color="green" class="flex-grow-0" app dark>
      <v-app-bar-title>Dashboard</v-app-bar-title>
  </v-app-bar>
</template>-->

<template>
  <v-app-bar color="green" class="flex-grow-0" app dark>
      <v-app-bar-title>Dashboard</v-app-bar-title>
  </v-app-bar>
  <div>
    <h3>Hi {{ currentUser.fullname }}</h3>
  </div>
</template>

<script>
  export default {
    computed: {
      currentUser() {
        return this.$store.state.auth.user;
      },
    },
  }
</script>