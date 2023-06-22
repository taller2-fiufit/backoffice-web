<template>
  <v-app-bar color="#9ACD32" class="flex-grow-0" app dark>
    <v-app-bar-title>Dashboard</v-app-bar-title>
  </v-app-bar>
  <v-container>
    <v-row>
      <v-card-title id="title">Métricas Generales</v-card-title>
      <v-divider class="mx-4"></v-divider>
    </v-row>
    <v-row class="my-5">
      <v-col cols="4">
        <DashboardCounter title="Usuarios" :quantity="this.totalUsersStats" icon="mdi-account-multiple" color="amber"></DashboardCounter>
      </v-col>
      <v-col cols="4">
        <DashboardCounter title="Planes" :quantity="this.totalPlansStats" icon="mdi-run" color="green"></DashboardCounter>
      </v-col>
      <v-col cols="4">
        <DashboardCounter title="Servicios" :quantity="this.totalServicesStats" icon="mdi-tray-full" color="secondary"></DashboardCounter>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import UserService from '../services/user.service';
  import TrainingPlanService from '../services/training-plan.service';
  import ServicesService from '../services/services.service';
  import DashboardCounter from '../components/DashboardCounter.vue'

  export default {
    name: 'User',
    components: {
      DashboardCounter,
    },
    data () {
      return {
        fullname: '',
        itemsPerPage: 5,
        totalUsersStats: 0,
        totalPlansStats: 0,
        totalServicesStats: 0
      }
    },
    mounted() {
      UserService.getCurrentUserInfo().then(
        response => {
          this.fullname = response.data.fullname;
        },
        error => {

        },
      )
      UserService.getUserCount().then(
        response => {
          console.log(response);
          this.totalUsersStats = response.data.count;
        },
        error => {
          this.totalUsersStats = 0;
        },
      )
      TrainingPlanService.getTrainingPlanCount().then(
        response => {
          this.totalPlansStats = response.data.count;
        },
        error => {
          this.totalPlansStats = 0;
        },
      )
      ServicesService.getServiceCount().then(
        response => {
          this.totalServicesStats = response.data.count;
        },
        error => {
          this.totalServicesStats = 0;
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