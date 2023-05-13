<template>
  <v-app-bar color="#9ACD32" class="flex-grow-0" app dark>
    <v-app-bar-title>Planes de Entrenamiento</v-app-bar-title>
  </v-app-bar>

  <v-card class="mx-5 my-5 rounded-sm">
    <div id="table-div" class="pl-15">
      <PlansTable v-if="trainingPlans" :headers="headers" :items="trainingPlans" :loading="loading"/>
    </div>
  </v-card>
</template>


<script>
  import TrainingPlanService from '../services/training-plan.service';
  import PlansTable from '../components/PlansTable.vue'
  export default {
    name: 'Plans',
    components: {
      PlansTable
    },
    data() {
      return {
        headers: [  
          { text: "#", value: "id", sortable: true},
          { text: "TÍTULO", value: "title", sortable: true},
          { text: "TIPO", value: "type", sortable: true},
          { text: "DETALLE", value: "actions"}
        ],
        trainingPlans: [],
        loading: true
      }
    },
    async mounted() {
      let response = await TrainingPlanService.getTrainingPlanList()
      this.trainingPlans = response.data;
      this.loading = false;
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