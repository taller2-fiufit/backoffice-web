<template>
  <v-app-bar color="#9ACD32" class="flex-grow-0" app dark>
    <v-app-bar-title>Dashboard</v-app-bar-title>
  </v-app-bar>
  <div>
    <h3 id="dashboard-title" v-if="fullname">¡Bienvenido, {{ fullname }}!</h3>
  </div>
  <v-container>
    <v-card-title id="title" class="pb-2">Métricas Generales<v-divider class="ml-4"></v-divider></v-card-title>
    <v-row class="my-3">
      <v-col cols="4">
        <DashboardCardNumber title="Usuarios" :quantity="this.totalUsersStats" icon="mdi-account-multiple" caption="Cantidad total" color="amber"></DashboardCardNumber>
      </v-col>
      <v-col cols="4">
        <DashboardCardNumber title="Planes" :quantity="this.totalPlansStats" icon="mdi-tray-full" caption="Cantidad total" color="green"></DashboardCardNumber>
      </v-col>
      <v-col cols="4">
        <DashboardCardNumber title="Servicios" :quantity="this.totalServicesStats" icon="mdi-charity" caption="Cantidad total" color="secondary"></DashboardCardNumber>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import UserService from '../services/user.service';
  import TrainingPlanService from '../services/training-plan.service';
  import ServicesService from '../services/services.service';
  import DashboardCardNumber from '../components/DashboardCardNumber.vue'

  export default {
    name: 'User',
    components: {
      DashboardCardNumber,
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
          this.totalUsersStats = response.data;
        },
        error => {
          this.totalUsersStats = 0;
        },
      )
      TrainingPlanService.getTrainingPlanCount().then(
        response => {
          this.totalPlansStats = response.data;
        },
        error => {
          this.totalPlansStats = 0;
        },
      )
      ServicesService.getServiceCount().then(
        response => {
          this.totalServicesStats = response.data;
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