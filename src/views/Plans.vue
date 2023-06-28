<template>
  <v-app-bar color="#9ACD32" class="flex-grow-0" app dark>
    <v-app-bar-title>Planes de Entrenamiento</v-app-bar-title>
  </v-app-bar>

  <v-card class="mx-5 my-5 rounded-sm">
    <div id="table-div" class="pl-15">
      <PlansTable v-if="trainingPlans"
        :headers="headers"
        :items="trainingPlans"
        :loading="loading"
        :error="error"
        @change_diff_filter="updateDiffFilter"
        @change_type_filter="updateTypeFilter"
        />
    </div>
  </v-card>
</template>

<script>
import TrainingPlanService from '../services/training-plan.service'
import PlansTable from '../components/PlansTable.vue'
export default {
  name: 'PlansView',
  components: {
    PlansTable
  },
  data () {
    return {
      headers: [
        { text: '#', value: 'id', sortable: true },
        { text: 'TÍTULO', value: 'title' },
        { text: 'TIPO', value: 'type' },
        { text: 'DIFICULTAD', value: 'difficulty', sortable: true },
        { text: 'DETALLE', value: 'actions' }
      ],
      trainingPlans: [],
      difficulty_filtering: [0, 10],
      type_filtering: 'all',
      loading: true,
      error: false
    }
  },
  methods: {
    async updateList () {
      TrainingPlanService.getTrainingPlanList(this.difficulty_filtering[0], this.difficulty_filtering[1] + 1, this.type_filtering).then(
        (response) => {
          this.trainingPlans = response.data
          this.loading = false
        },
        () => {
          this.error = true
          this.loading = false
        }
      )
    },

    async updateDiffFilter (val) {
      this.loading = true
      this.difficulty_filtering = val
      this.updateList()
    },

    async updateTypeFilter (val) {
      this.loading = true
      this.type_filtering = val
      this.updateList()
    }
  },
  async mounted () {
    this.updateList()
  }
}
</script>

<style>
#table-div {
  padding-top: 50px;
  padding-left: 50px;
  padding-right: 50px;
  padding-bottom: 50px;
}

.rounded-sm {
  background: #F7F7F7;
}
</style>
