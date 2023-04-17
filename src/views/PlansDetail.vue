<template>
  <ng-container>
  <div class="bg-white shadow overflow-hidden rounded-md">
      <div class="px-4 py-5 border-b border-gray-200 sm:px-6">
        <div class="rich-text">
          <h2>Detalle de Plan de Entrenamiento</h2>
        </div>
      </div>
      <div class="p-0">
        <dl>
          <!--ID-->
          <div
            class="mt-0 grid grid-cols-3 gap-4 border-t border-gray-200 px-6 py-5"
          >
            <dt class="text-md leading-5 font-medium text-gray-900">ID</dt>
            <dd
              class="mt-1 text-md leading-5 text-gray-900 sm:mt-0 sm:col-span-2"
            >
              {{ this.plan[0].id }}
            </dd>
          </div>
  
          <div
            class="mt-0 grid grid-cols-3 gap-4 border-t border-gray-200 px-6 py-5"
          >
            <dt class="text-md leading-5 font-medium text-gray-900">Títutlo</dt>
            <dd
              class="mt-1 text-md leading-5 text-gray-900 sm:mt-0 sm:col-span-2"
            >
              {{ this.plan[0].title }}
            </dd>
          </div>
  
          <div
            class="mt-0 grid grid-cols-3 gap-4 border-t border-gray-200 px-6 py-5"
          >
            <dt class="text-md leading-5 font-medium text-gray-900">Descripción</dt>
            <dd
              class="mt-1 text-md leading-5 text-gray-900 sm:mt-0 sm:col-span-2"
            >
              {{ this.plan[0].description }}
            </dd>
          </div>
  
          <div
            class="mt-0 grid grid-cols-3 gap-4 border-t border-gray-200 px-6 py-5"
          >
            <dt class="text-md leading-5 font-medium text-gray-900">Tipo</dt>
            <dd
              class="mt-1 text-md leading-5 text-gray-900 sm:mt-0 sm:col-span-2"
            >
              {{ this.plan[0].type }}
            </dd>
          </div>
          
          <div
            class="mt-0 grid grid-cols-3 gap-4 border-t border-gray-200 px-6 py-5"
          >
            <dt class="text-md leading-5 font-medium text-gray-900">Dificultad</dt>
            <dd
              class="mt-1 text-md leading-5 text-gray-900 sm:mt-0 sm:col-span-2"
            >
              {{ this.plan[0].difficulty }}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </ng-container>
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