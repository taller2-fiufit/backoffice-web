<template>
  <h3>hola acá poner la info de this.plan</h3>
</template>
  
<script>
  import TrainingPlanService from '../services/training-plan.service';

  export default {
    name: 'PlansDetail',
    data() {
      return {
        plan: null
      }
    },
    created() {
      const planId = (this.$route.params.id).split(' ')[2];
      TrainingPlanService.getTrainingPlanInfoById(planId).then(
        (response) => {
          this.plan = response.data;
        },
        (error) => {
        }
      );
    }
  }
</script>