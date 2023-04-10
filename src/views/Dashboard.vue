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
    <h3>Hi {{ currentUserFullname }}</h3>
  </div>
</template>

<script>
  export default {
    computed: {
      async currentUserFullname() {
        let user = this.$store.state.auth.user;
        let userId = user.sub;
        // console.log("hola");
        // console.log(user);
        // console.log(userId);
        let currentUserFullname = await this.$store.dispatch("userModule/getUserFullname", userId);
        // console.log(currentUserFullname);
        console.log(currentUserFullname);
        return currentUserFullname
      }
    }
  }
</script>