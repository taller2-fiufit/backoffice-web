<template>
  <v-app-bar color="#9ACD32" class="flex-grow-0" app dark>
    <v-app-bar-title>Dashboard</v-app-bar-title>
  </v-app-bar>
  <div>
    <h3 id="dashboard-title">¡Bienvenido, {{ fullname }}!</h3>
  </div>
</template>

<script>
  import UserService from '../services/user.service';

  export default {
    name: 'User',
    data() {
      return {
        fullname: ''
      };
    },

    mounted() {
      UserService.getCurrentUserInfo().then(
        response => {
          this.fullname = response.data.fullname;
        },
        error => {

        },
      )
    }
  }
</script>

<style>
#dashboard-title {
  padding-left: 20px;
  padding-top: 20px
}
</style>