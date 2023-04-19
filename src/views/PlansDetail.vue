<template>
  <div v-if="this.plan">
    <v-app-bar color="#9ACD32" class="flex-grow-0" app dark>
      <v-card-actions>
        <v-btn icon @click="$router.back()"><v-icon color="#2b3c4b">mdi-keyboard-backspace</v-icon></v-btn>
      </v-card-actions>
      <v-breadcrumbs :items="['Planes', plan.title]">
        <template v-slot:divider>
          <v-icon icon="mdi-chevron-right"></v-icon>
        </template>
      </v-breadcrumbs>
    </v-app-bar>
    <v-card
    class="mx-5 my-5"
    variant="outlined"
    >
    <v-card-item>
      <v-row>
        <v-col cols="7" class="mt-2 mb-4"> 
          <div class="text-overline">
            Información del plan
          </div>
          <v-row justify="center" class="mt-5">
            <div class="text-h5">
              <v-icon end icon="mdi-dumbbell"></v-icon>
              {{ plan.title }}
            </div>
          </v-row>
          <v-row justify="center" class="mt-4">
            <v-chip color="#9ACD32" text-color="white">{{ plan.type }}</v-chip>
          </v-row>
          <v-row>
            <v-col cols="8" offset="2" class="mt-4">
              <v-row>
                <v-text-field
                  :value="plan.id"
                  label="ID"
                  prepend-icon="mdi-pound"
                  readonly
                  variant="underlined"
                  persistent-placeholder
                ></v-text-field>
                <v-text-field
                  class="ml-9"
                  :value="plan.difficulty"
                  label="Difficulty"
                  prepend-icon="mdi-weight-lifter"
                  readonly
                  variant="underlined"
                  persistent-placeholder
                  suffix="pts"
                ></v-text-field>
              </v-row>
              <div class="text-caption"> {{ plan.description }} </div>
            </v-col>
          </v-row>
        </v-col>
        <v-divider vertical thickness="2"></v-divider>
        <v-col cols="4" class="mt-2 mb-4">
          <div class="text-overline">
            Contenido multimedia
          </div>
          <v-img
            max-width="200"
            src='https://cdn.vuetifyjs.com/images/lists/1.jpg'
            class="rounded-circle mx-auto"
          ></v-img>
        </v-col>
      </v-row>
    </v-card-item>
  </v-card>
  </div>
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
      TrainingPlanService.getTrainingPlanInfoById(this.$route.params.id).then(
        (response) => {
          this.plan = response.data;
        },
        (error) => {
        }
      );
    }
  }
</script>