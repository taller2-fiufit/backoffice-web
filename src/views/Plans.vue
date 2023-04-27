<template>
  <v-app-bar color="#9ACD32" class="flex-grow-0" app dark>
    <v-app-bar-title>Planes de Entrenamiento</v-app-bar-title>
  </v-app-bar>

  <br>

  <div id="table-div" class="pl-15">
    <PlansTable v-if="trainingPlans" :headers="headers" :items="trainingPlans" />
  </div>
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
          { text: "ID", value: "id", sortable: true},
          { text: "TITLE", value: "title", sortable: true},
          { text: "TYPE", value: "type", sortable: true},
          { text: "ACTIONS", value: "actions"}
        ],
        trainingPlans: null
      }
    },
    created() {
      TrainingPlanService.getTrainingPlanList().then(
        (response) => {
          this.trainingPlans = response.data;
        },
        (error) => {
        }
      );
    },
  }
</script>

<style>
#table-div {
  padding-top: 20px;
  max-width: 1200px;
}
</style>