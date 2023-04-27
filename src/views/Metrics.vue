<template>
  <v-app-bar color="#9ACD32" class="flex-grow-0" app dark>
    <v-app-bar-title>Métricas</v-app-bar-title>
  </v-app-bar>

  <v-card class="mx-5 my-5 rounded-sm">
    <v-tabs v-model="tab" align-tabs="center" color="primary lighten-3">
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
  export default {
    name: 'Metrics',
    data() {
      return {
        tab: null,
        usersMetrics: null,
        trainingPlansMetrics: null,
        transactionsMetrics: null,
      };
    },
    created() {
      MetricsService.getUsersMetrics().then(
        (response) => {
          this.usersMetrics = response.data;
        },
        (error) => {
        }
      );
      MetricsService.getTrainingPlansMetrics().then(
        (response) => {
          this.trainingPlansMetrics = response.data;
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
  }
</script>