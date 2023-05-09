<template>
<v-card flat>
    <v-container>
      <v-card-title class="text-center pb-10">Métricas Generales</v-card-title>
      <v-row>
        <v-col cols="6">
          <v-row>
            <v-col cols="12" class="my-0 py-0">
              <v-card-title>Métricas de Registro</v-card-title>
              <v-space></v-space>
              <v-card-text v-if="this.usersMetrics">Usuarios registrados utilizando mail y contraseña: {{this.usersMetrics.signinsWithMail}}</v-card-text>
              <v-card-text v-if="this.usersMetrics">Usuarios registrados utilizando identidad federada: {{this.usersMetrics.signinsWithFederatedId}}</v-card-text>
            </v-col>
          </v-row>
        </v-col>
        <v-divider vertical class="my-2 vertical-divider"></v-divider>
        <v-col cols="6">
          <v-row>
            <v-col cols="12" class="my-0 py-0">
              <v-card-title>Métricas de Login</v-card-title>
              <v-space></v-space>
              <v-card-text v-if="this.usersMetrics">Usuarios loggueados utilizando mail y contraseña: {{this.usersMetrics.loginsWithMail}}</v-card-text>
              <v-card-text v-if="this.usersMetrics">Usuarios loggueados utilizando identidad federada:{{this.usersMetrics.loginsWithFederatedId}}</v-card-text>
            </v-col>
          </v-row>
        </v-col>
        <v-divider horizontal class="my-4 horizontal-divider"></v-divider>
        <v-col cols="6">
          <v-row>
            <v-col cols="12" class="my-0 py-0">
              <v-card-title>Métricas de Usuarios Bloqueados</v-card-title>
              <v-space></v-space>
              <v-card-text v-if="this.usersMetrics">Cantidad de Usuarios: {{this.usersMetrics.signinsWithMail + this.usersMetrics.signinsWithFederatedId}}</v-card-text>
              <v-card-text v-if="this.usersMetrics">Cantidad de Usuarios Bloqueados: {{this.usersMetrics.blockedUsers}}</v-card-text>
            </v-col>
          </v-row>
        </v-col>
        <v-divider horizontal class="my-4 horizontal-divider"></v-divider>
        <v-card-title class="text-center py-5">Métricas Por Fecha</v-card-title>
        <v-col cols="12">
          <v-form fast-fail @submit.prevent="handleUserSelectedDates">
            <span>Elegir Fecha de Inicio y Fin para generar los gráficos a lo largo del tiempo</span>
            <div>
              <ErrorAlert v-if="usersError" :error="usersError" />
            </div>
            <v-text-field v-model="usersStartDate" name="usersStartDate" type="date" label="Fecha de inicio" required></v-text-field>
            <v-text-field v-model="usersEndDate" name="usersEndDate" type="date" label="Fecha de fin" required></v-text-field>
            <v-btn type="submit" color="#9ACD32" block class="mt-2">
              <span
                class="my-14 spinner-border spinner-border-sm"
              ></span>
              <span>Generar gráficos</span>
            </v-btn> 
          </v-form>
        </v-col>
        <v-space></v-space>
        <v-col cols="6">
          <v-row>
            <v-col cols="12" class="my-0 py-0">
              <v-card-title>Métricas de Registro</v-card-title>
              <v-space></v-space>
              <v-card-text>Usuarios utilizando mail y contraseña a lo largo del tiempo</v-card-text>
              <v-card-text>Usuarios utilizando identidad federada a lo largo del tiempo</v-card-text>
              <v-card-text>Mail y Contraseña vs Identidad federada</v-card-text>
              <div>
                <BarChart class="bar-chart" v-bind="this.userSigninsMailVsFederatedIdBarChartProps" />
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-divider vertical class="my-2 vertical-divider"></v-divider>
        <v-col cols="6">
          <v-row>
            <v-col cols="12" class="my-0 py-0">
              <v-card-title>Métricas de Login</v-card-title>
              <v-space></v-space>
              <v-card-text>Usuarios utilizando mail y contraseña a lo largo del tiempo</v-card-text>
              <v-card-text>Usuarios utilizando identidad federada a lo largo del tiempo</v-card-text>
              <v-card-text>Mail y Contraseña vs Identidad federada</v-card-text>
              <div>
                <BarChart class="bar-chart" v-bind="this.userLoginsMailVsFederatedIdBarChartProps" />
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-divider horizontal class="my-4 horizontal-divider"></v-divider>
        <v-col cols="6">
          <v-row>
            <v-col cols="12" class="my-0 py-0">
              <v-card-title>Métricas de Usuarios Bloqueados</v-card-title>
              <v-space></v-space>
              <v-card-text>Usuarios bloqueados a lo largo del tiempo</v-card-text>
              <v-card-text>Cantidad de Usuarios Bloqueados vs No Bloqueados</v-card-text>
              <div>
                <BarChart class="bar-chart" v-bind="this.userBlockedVsNotBlockedBarChartProps" />
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
</v-card>
</template>

<script>
  import MetricsService from '../services/metrics.service';
  import ErrorAlert from '../components/ErrorAlert.vue'
  import useVuelidate from '@vuelidate/core';
  import { required } from "@vuelidate/validators";
  import { BarChart, useBarChart } from 'vue-chart-3';
  import { Chart, registerables } from 'chart.js';
  import { computed, ref } from "vue";

  Chart.register(...registerables);

  export default {
    name: 'Metrics',
    components: {
      ErrorAlert,
      BarChart
    },
    data() {
      return {
        tab: null,
        // Selected dates
        v$: useVuelidate(),
        loading: false,
        usersStartDate: '',
        usersEndDate: '',
        usersError: '',
        // Metrics
        usersMetrics: null,
        usersMetricsByDate: null,
        // User Charts
        userSigninsMailVsFederatedIdBarChartProps: null,
        userLoginsMailVsFederatedIdBarChartProps: null,
        userBlockedVsNotBlockedBarChartProps: null
      };
    },
    created() {
      MetricsService.getUsersMetrics().then(
        (response) => {
          this.usersMetrics = response.data;
          console.log(this.usersMetrics); // borrar

          this.createUserGraphsMetrics()
        },
        (error) => {
        }
      );
    },
    methods: {
      // User Selected Dates
      handleUserSelectedDates() {
        this.loading = true;
        this.v$.$validate()
        if (this.v$.$error) {
          this.usersError = 'Falta completar los siguientes campos:';
          if (this.usersStartDate == "") {
            this.usersError += "<br>- Fecha de inicio"
          }
          if (this.usersEndDate == "") {
            this.usersError += "<br>- Fecha de fin"
          }
        } else {
          MetricsService.getUsersMetricsByDate(this.startDate, this.endDate).then(
            (response) => {
              this.usersMetricsByDate = response.data;
              console.log(this.usersMetricsByDate); // borrar

              this.createUserGraphsMetricsByDate()
            },
            (error) => {
            }
          );
        }
        this.loading = false;
      },
      // User Graphs
      createUserGraphsMetrics() {
        // Number bar charts
        this.createUserSigninsMailVsFederatedIdChart(),
        this.createUserLoginsMailVsFederatedIdChart(),
        this.createUserBlockedVsNotBlockedBarChart()
      },
      // Métricas de Registro: Mail y Contraseña vs Identidad federada
      createUserSigninsMailVsFederatedIdChart() {
        const userRegisterMetrics = Object.values(this.usersMetrics);
        //                signinsWithMail,        signinsWithFederatedId
        const data = ref([userRegisterMetrics[0], userRegisterMetrics[1]]);

        const chartData = computed(() => ({
          labels: ["Mail y Contraseña", "Identidad federada"],
          datasets: [
            {
              data: data.value,
              backgroundColor: ["#9ACD32", "#2b3c4b"]
            },
          ],
        }));

        const { barChartProps, barChartRef } = useBarChart({ chartData });

        this.userSigninsMailVsFederatedIdBarChartProps = barChartProps;
      },
      // Métricas de Login: Mail y Contraseña vs Identidad federada
      createUserLoginsMailVsFederatedIdChart() { 
        const userLoginMetrics = Object.values(this.usersMetrics);
        //                loginsWithMail, loginsWithFederatedId
        const data = ref([userLoginMetrics[2], userLoginMetrics[3]]);

        const chartData = computed(() => ({
          labels: ["Mail y Contraseña", "Identidad federada"],
          datasets: [
            {
              data: data.value,
              backgroundColor: ["#9ACD32", "#2b3c4b"]
            },
          ],
        }));

        const { barChartProps, barChartRef } = useBarChart({ chartData });

        this.userLoginsMailVsFederatedIdBarChartProps = barChartProps;
      },
      createUserBlockedVsNotBlockedBarChart() {
        const userBlockedMetrics = Object.values(this.usersMetrics);
        //                 signinsWithMail      +  signinsWithFederatedId,                       blockedUsers
        const data = ref([userBlockedMetrics[0] + userBlockedMetrics[1] - userBlockedMetrics[4], userBlockedMetrics[4]]);

        const chartData = computed(() => ({
          labels: ["Usuarios no bloqueados", "Usuarios bloqueados"],
          datasets: [
            {
              data: data.value,
              backgroundColor: ["#9ACD32", "#2b3c4b"]
            },
          ],
        }));

        const { barChartProps, barChartRef } = useBarChart({ chartData });

        this.userBlockedVsNotBlockedBarChartProps = barChartProps;
      },
      // User Graphs by date
      createUserGraphsMetricsByDate() {

      }
    },
    validations() {
      return {
        usersStartDate: { required },
        usersEndDate: { required },
      }
    }
  }
</script>

<style>
.bar-chart {
  height: 300px;
  width: 600px;
  align-self: center;
}
</style>