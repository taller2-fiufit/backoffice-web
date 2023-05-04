<template>
  <v-app-bar color="#9ACD32" class="flex-grow-0" app dark>
    <v-app-bar-title>Métricas</v-app-bar-title>
  </v-app-bar>

  <v-card class="mx-5 my-5 rounded-sm">
    <v-tabs v-model="tab" align-tabs="center" color="#9ACD32">
      <v-tabs-slider></v-tabs-slider>
      <v-tab value="users">Usuarios</v-tab>
      <v-tab value="plans">Entrenamientos</v-tab>
      <v-tab value="transactions">Transacciones</v-tab>
    </v-tabs>

    <v-divider class="mx-7"></v-divider>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="users">
          <v-card flat>
            <v-container>
              <v-row>
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
                      <v-card-title>Métricas de usuarios bloqueados</v-card-title>
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
        </v-window-item>

        <v-window-item value="plans">
          <v-card flat>
            <v-container>
              <v-row>
                <v-col cols="6">
                  <v-row>
                    <v-col cols="12" class="my-0 py-0">
                      <v-card-title>Métricas de Nuevos Entrenamientos</v-card-title>
                      <v-space></v-space>
                      <v-card-text></v-card-text>
                    </v-col>
                  </v-row>
                </v-col>
                <v-divider vertical class="my-2 vertical-divider"></v-divider>
                <v-col cols="6">
                  <v-row>
                    <v-col cols="12" class="my-0 py-0">
                      <v-card-title>Métricas de Entrenamientos</v-card-title>
                      <v-space></v-space>
                      <v-card-text></v-card-text>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-window-item>

        <v-window-item value="transactions">
          <v-card flat>
            <v-container>
              <v-row>
                <v-col cols="6">
                  <v-row>
                    <v-col cols="12" class="my-0 py-0">
                      <v-card-title>Métricas de Aportes</v-card-title>
                      <v-space></v-space>
                      <v-card-text></v-card-text>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>

</template>

<script>
  import MetricsService from '../services/metrics.service';
  import { BarChart, useBarChart } from 'vue-chart-3';
  import { Chart, registerables } from 'chart.js';
  import { computed, ref } from "vue";

  Chart.register(...registerables);

  export default {
    name: 'Metrics',
    components: {
      BarChart
    },
    data() {
      return {
        tab: null,
        // Metrics
        usersMetrics: null,
        trainingPlansMetrics: null,
        transactionsMetrics: null,
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
          // console.log(this.usersMetrics); // borrar

          this.createUserGraphMetrics()
        },
        (error) => {
        }
      );
      MetricsService.getTrainingPlansMetrics().then(
        (response) => {
          this.trainingPlansMetrics = response.data;
          // console.log(this.trainingPlansMetrics) // borrar
        },
        (error) => {
        }
      );
      MetricsService.getTransactionsMetrics().then(
        (response) => {
          this.transactionMetrics = response.data;
        },
        (error) => {
        }
      );
    },
    methods: {
      createUserGraphMetrics() {
        // Number bar charts
        this.createUserSigninsMailVsFederatedIdChart(),
        this.createUserLoginsMailVsFederatedIdChart(),
        this.createUserBlockedVsNotBlockedBarChart()
      },
      // Métricas de Registro: Mail y Contraseña vs Identidad federada
      createUserSigninsMailVsFederatedIdChart() {
        const userMetrics = Object.values(this.usersMetrics);
        //           signinsWithMail, signinsWithFederatedId
        const data = ref([userMetrics[0], userMetrics[1]]);

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
        const userMetrics = Object.values(this.usersMetrics);
        //                loginsWithMail, loginsWithFederatedId
        const data = ref([userMetrics[2], userMetrics[3]]);

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
        const userMetrics = Object.values(this.usersMetrics);
        //               signinsWithMail + signinsWithFederatedId, blockedUsers
        const data = ref([userMetrics[0] + userMetrics[1], userMetrics[4]]);

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