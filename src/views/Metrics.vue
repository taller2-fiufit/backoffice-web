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
          <UserMetrics />
        </v-window-item>

        <v-window-item value="plans">
          <TrainingMetrics />
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
  import ErrorAlert from '../components/ErrorAlert.vue'
  import UserMetrics from '../components/UserMetrics.vue'
  import TrainingMetrics from '../components/TrainingMetrics.vue'
  
  export default {
    name: 'Metrics',
    components: {
      ErrorAlert,
      UserMetrics,
      TrainingMetrics
    },
    data() {
      return {
        tab: null
      };
    }
  }
</script>
