<template>
  <v-app-bar color="#9ACD32" class="flex-grow-0" app dark>
    <v-app-bar-title>Planes de Entrenamiento</v-app-bar-title>
  </v-app-bar>

  <v-card class="mx-5 my-5 rounded-sm">
    <div id="table-div" class="pl-15">
      <PlansTable v-if="trainingPlans" :headers="headers" :items="trainingPlans" />
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
  padding-top: 50px;
  padding-left: 50px;
  padding-right: 50px;
  padding-bottom: 50px;
}

.rounded-sm {
  background: #F7F7F7;
}
</style>