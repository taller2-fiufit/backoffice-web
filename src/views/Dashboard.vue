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
    <h3>Hi {{ fullname }}</h3>
  </div>
</template>

<script>
  import VueJwtDecode from 'vue-jwt-decode';
  import UserService from '../services/user.service';

  export default {
    name: 'User',
    data() {
      return {
        fullname: ''
      };
    },

    mounted() {
      let user = this.$store.state.auth.user;
      let userId = VueJwtDecode.decode(user.access_token).sub;
      console.log(userId);
      UserService.getUserFullname(userId).then(
        response => {
          this.fullname = response.data.fullname;
        },
        error => {

        },
      )
    }
  }
</script>