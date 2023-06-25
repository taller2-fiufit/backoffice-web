<template>
  <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
  <v-card flat class="rounded-sm">
    <v-container>
      <v-card-title id="title" class="text-center pb-5">Métricas Generales</v-card-title>
      <v-form class="text-center" fast-fail @submit.prevent="handleUserSelectedDates">
        <div>Elegir fecha de inicio y fin para generar los gráficos a lo largo del tiempo.</div>
        <div class="text-caption text-center mx-5"> Por default, las Métricas generadas son de la última semana. </div>
        <div>
          <ErrorAlert v-if="usersError" :error="usersError" />
        </div>

        <v-text-field v-model="usersStartDate" name="usersStartDate" type="date" label="Fecha de inicio" required class="dateInput1"></v-text-field>
        <v-text-field v-model="usersEndDate" name="usersEndDate" type="date" label="Fecha de fin" required class="dateInput2"></v-text-field>
        
        <v-btn type="submit" color="#9ACD32" class="mt-2 mb-7" :disabled="loading">
          <span
            v-show="loading"
            class="my-14 spinner-border spinner-border-sm"
          ></span>
          <span>Generar gráficos</span>
        </v-btn> 

        <v-divider horizontal class="my-4 horizontal-divider"></v-divider>
      </v-form>
    </v-container>
  </v-card>

  <v-card flat class="rounded-sm">
    <v-container>
      <v-row>
        <v-col cols="6" class="mb-10">
          <v-row>
            <v-col cols="12" class="my-0 py-0">
              <v-card-title class="pb-3">Métricas de Registro</v-card-title>

              <v-card class="mx-auto">
                <v-row class="my-5">
                  <v-col class="text-center mb-0 pb-0" cols="2">
                    <v-row justify="center">
                      <v-col cols="2">
                        <v-sheet
                          height="80"
                          width="80"
                          rounded
                          color="#9ACD32" 
                        >
                          <v-container class="mt-5" fill-height fluid>
                            <v-row>
                              <v-col class="text-center">
                                <v-icon size="45">mdi-account-plus</v-icon>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-sheet>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="10" class="mb-0 pb-0 text-center">
                    <v-card-text v-if="this.usersMetrics" class="pt-0">
                      <div class="text-overline font-weight-medium" style="font-size: 12px !important;">
                        Utilizando mail y contraseña
                      </div>
                      <div class="text-overline font-weight-bold" style="font-size: 15px !important;">
                        {{this.usersMetrics.signinsWithMail}}
                      </div>
                    </v-card-text>
                    <v-card-text v-if="this.usersMetrics" class="pt-0">
                      <div class="text-overline font-weight-medium" style="font-size: 12px !important;">
                        Utilizando identidad federada
                      </div>
                      <div class="text-overline font-weight-bold" style="font-size: 15px !important;">
                        {{this.usersMetrics.signinsWithFederatedId}}
                      </div>
                    </v-card-text>
                    <v-card-text v-if="this.usersMetrics && (this.usersMetrics.signinsWithMail || this.usersMetrics.signinsWithFederatedId)" class="pt-0">
                      <div class="text-overline font-weight-medium" style="font-size: 12px !important;">
                        Mail y Contraseña vs Identidad federada
                      </div>
                      <div>
                        <BarChart class="bar-chart" v-bind="this.userSigninsMailVsFederatedIdBarChartProps" />
                      </div>
                    </v-card-text>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
        <v-divider vertical class="my-2 vertical-divider mb-5"></v-divider>
        <v-col cols="6">
          <v-row>
            <v-col cols="12" class="my-0 py-0">
              <v-card-title class="pb-3">Métricas de Login</v-card-title>

              <v-card class="mx-auto">
                <v-row class="my-5">
                  <v-col class="text-center mb-0 pb-0" cols="2">
                    <v-row justify="center">
                      <v-col cols="2">
                        <v-sheet
                          height="80"
                          width="80"
                          rounded
                          color="#9ACD32" 
                        >
                          <v-container class="mt-5" fill-height fluid>
                            <v-row>
                              <v-col class="text-center">
                                <v-icon size="45">mdi-login</v-icon>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-sheet>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="10" class="mb-0 pb-0 text-center">
                    <v-card-text v-if="this.usersMetrics" class="pt-0">
                      <div class="text-overline font-weight-medium" style="font-size: 12px !important;">
                        Utilizando mail y contraseña
                      </div>
                      <div class="text-overline font-weight-bold" style="font-size: 15px !important;">
                        {{this.usersMetrics.loginsWithMail}}
                      </div>
                    </v-card-text>
                    <v-card-text v-if="this.usersMetrics" class="pt-0">
                      <div class="text-overline font-weight-medium" style="font-size: 12px !important;">
                        Utilizando identidad federada
                      </div>
                      <div class="text-overline font-weight-bold" style="font-size: 15px !important;">
                        {{this.usersMetrics.loginsWithFederatedId}}
                      </div>
                    </v-card-text>
                    <v-card-text v-if="this.usersMetrics && (this.usersMetrics.loginsWithMail || this.usersMetrics.loginsWithFederatedId)" class="pt-0">
                      <div class="text-overline font-weight-medium" style="font-size: 12px !important;">
                        Mail y Contraseña vs Identidad federada
                      </div>
                      <div>
                        <BarChart class="bar-chart" v-bind="this.userLoginsMailVsFederatedIdBarChartProps" />
                      </div>
                    </v-card-text>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
        <v-divider horizontal class="my-4 horizontal-divider"></v-divider>
        <v-col cols="6" offset="3">
          <v-row class="mb-5">
            <v-col cols="12" class="my-0 py-0">
              <v-card-title class="pb-3">Métricas de Usuarios Bloqueados</v-card-title>
              
              <v-card class="mx-auto">
                <v-row class="my-5">
                  <v-col class="text-center mb-0 pb-0" cols="2">
                    <v-row justify="center">
                      <v-col cols="2">
                        <v-sheet
                          height="80"
                          width="80"
                          rounded
                          color="#9ACD32" 
                        >
                          <v-container class="mt-5" fill-height fluid>
                            <v-row>
                              <v-col class="text-center">
                                <v-icon size="45">mdi-block-helper</v-icon>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-sheet>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="10" class="mb-0 pb-0 text-center">
                    <v-card-text v-if="this.usersMetrics" class="pt-0">
                      <div class="text-overline font-weight-medium" style="font-size: 12px !important;">
                        Cantidad de Usuarios
                      </div>
                      <div class="text-overline font-weight-bold" style="font-size: 15px !important;">
                        {{parseInt(this.usersMetrics.signinsWithMail) + parseInt(this.usersMetrics.signinsWithFederatedId)}}
                      </div>
                    </v-card-text>
                    <v-card-text v-if="this.usersMetrics" class="pt-0">
                      <div class="text-overline font-weight-medium" style="font-size: 12px !important;">
                        Cantidad de Usuarios Bloqueados
                      </div>
                      <div class="text-overline font-weight-bold" style="font-size: 15px !important;">
                        {{this.usersMetrics.blockedUsers}}
                      </div>
                    </v-card-text>
                    <v-card-text v-if="this.usersMetrics && (this.usersMetrics.signinsWithMail || this.usersMetrics.signinsWithFederatedId || this.usersMetrics.blockedUsers)" class="pt-0">
                      <div class="text-overline font-weight-medium" style="font-size: 12px !important;">
                        Cantidad de Usuarios Bloqueados vs No Bloqueados
                      </div>
                      <div>
                        <BarChart class="bar-chart" v-bind="this.userBlockedVsNotBlockedBarChartProps" />
                      </div>
                    </v-card-text>
                  </v-col>
                </v-row>
              </v-card>
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
        dialog: true,
        // Selected dates
        v$: useVuelidate(),
        loading: false,
        usersStartDate: '',
        usersEndDate: '',
        usersError: '',
        // Metrics
        usersMetrics: null,
        // User Charts
        userSigninsMailVsFederatedIdBarChartProps: null,
        userLoginsMailVsFederatedIdBarChartProps: null,
        userBlockedVsNotBlockedBarChartProps: null
      };
    },
    created() {
      const today = new Date();

      // startDate
      const lastWeek = new Date(today.getTime() - (7 * 24 * 60 * 60 * 1000));
      const startDate = this.formatDate(lastWeek);

      // endDate
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      const endDate = this.formatDate(tomorrow);

      MetricsService.getUsersMetricsByDate(startDate, endDate).then(
        (response) => {
          this.usersMetrics = response.data;
          this.createUserGraphsMetrics()
        },
        (error) => {
        }
      );
    },
    methods: {
      // Format date
      formatDate(date) {
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        // Format the date as yyyy-mm-dd
        if (month < 10) {
          month = '0' + month;
        }
        if (day < 10) {
          day = '0' + day;
        }
        let formattedDate = year + '-' + month + '-' + day;
        return formattedDate;
      },
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
          this.loading = false;
          return
        }

        const startDate = new Date(this.usersStartDate);
        const endDate = new Date(this.usersEndDate);
        if (startDate > endDate) {
          this.usersError = 'La fecha de fin no puede ser luego de la fecha de inicio';
          this.loading = false;
          return
        }
        const actualDate = new Date();
        const tomorrow = new Date(actualDate)
        tomorrow.setDate(tomorrow.getDate() + 1)
        if (startDate > actualDate || endDate > tomorrow) {
          this.usersError = 'Las fechas seleccionadas no pueden ser mayores al día actual';
        } else {
          MetricsService.getUsersMetricsByDate(this.usersStartDate, this.usersEndDate).then(
            (response) => {
              this.usersError = null;
              this.usersMetrics = response.data;

              this.createUserGraphsMetrics()
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
        console.log(userRegisterMetrics);
        //                signinsWithMail,        signinsWithFederatedId
        const data = ref([userRegisterMetrics[0], userRegisterMetrics[1]]);

        const chartData = computed(() => ({
          labels: ['Mail y Contraseña', 'Identidad federada'],
          datasets: [
            {
              label: [""],
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
          labels: ['Mail y Contraseña', 'Identidad federada'],
          datasets: [
            {
              label: [""],
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
        const data = ref([parseInt(userBlockedMetrics[0]) + parseInt(userBlockedMetrics[1]) - parseInt(userBlockedMetrics[4]), userBlockedMetrics[4]]);

        const chartData = computed(() => ({
          labels: ['Usuarios no bloqueados', 'Usuarios bloqueados'],
          datasets: [
            {
              label: [""],
              data: data.value,
              backgroundColor: ["#9ACD32", "#2b3c4b"]
            },
          ],
        }));

        const { barChartProps, barChartRef } = useBarChart({ chartData });

        this.userBlockedVsNotBlockedBarChartProps = barChartProps;
      },
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
.rounded-sm {
  background: #F7F7F7;
}

.dialog {
  margin-left: 250px;
}
#title {
  font-size: 25px;
}

.bar-chart {
  height: 250px;
  width: 550px;
  align-self: center;
}

.dateInput1 {
  width: 20%;
  margin: auto;
  padding-top: 20px;
}

.dateInput2 {
  width: 20%;
  margin: auto;
}

#divider {
  border-width: 20px !important;
  border-color: #9ACD32 !important;
  width: 100%;
}

</style>