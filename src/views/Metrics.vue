<template>
  <v-app-bar color="#9ACD32" class="flex-grow-0" app dark>
    <v-app-bar-title>Métricas</v-app-bar-title>
  </v-app-bar>

  <v-card class="mx-5 my-5 rounded-sm">
    <v-tabs v-model="tab" align-tabs="center" color="#9ACD32">
      <v-tabs-slider></v-tabs-slider>
      <v-tab value="users">Usuarios</v-tab>
      <v-tab value="plans">Entrenamientos</v-tab>
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
      </v-window>
    </v-card-text>
  </v-card>

</template>

<script>
import UserMetrics from '../components/UserMetrics.vue'
import TrainingMetrics from '../components/TrainingMetrics.vue'

export default {
  name: 'MetricsView',
  components: {
    UserMetrics,
    TrainingMetrics
  },
  data () {
    return {
      tab: null
    }
  }
}
</script>
