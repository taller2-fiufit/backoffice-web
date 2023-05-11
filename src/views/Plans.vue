<template>
  <v-app-bar color="#9ACD32" class="flex-grow-0" app dark>
    <v-app-bar-title>Planes de Entrenamiento</v-app-bar-title>
  </v-app-bar>

  <br>

  <div id="table-div" class="mx-auto">
    <PlansTable :headers="headers" :items="trainingPlans" />
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
        trainingPlans: []
      }
    },
    created() {
      TrainingPlanService.getTrainingPlanList().then(
        (response) => {
          this.trainingPlans = response.data;
        },
        (error) => {
          this.trainingPlans = [{
            "id": 1,
            "title": "Split",
            "type": "walk",
            "difficulty": 5,
            "description": "El split, conocido también como apertura de piernas, spagat o grand écart, es una posición física en la cual las piernas están alineadas en lateral o frontalmente (son colineales) una con la otra y están extendidas en direcciones opuestas."
          }]
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