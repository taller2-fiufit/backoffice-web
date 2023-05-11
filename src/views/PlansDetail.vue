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
    class="mx-5 my-5 rounded-sm"
    >
    <v-sheet color='#9ACD32' height="6"></v-sheet>
    <v-card-item>
      <v-row>
        <v-col cols="6" class="mt-2 mb-4">
          <div class="text-overline">
            Información del plan
          </div>
          <v-row justify="center" class="mt-15">
            <div class="text-h5 font-weight-bold">
              <v-icon end icon="mdi-dumbbell"></v-icon>
              {{ plan.title }}
            </div>
          </v-row>
          <v-row justify="center" class="mt-4">
            <v-chip color="#8AB82D" text-color="white">{{ plan.type }}</v-chip>
          </v-row>
          <v-row>
            <v-col cols="8" offset="2" class="mt-15">
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
              <div class="text-caption text-justify"> {{ plan.description }} </div>
            </v-col>
          </v-row>
        </v-col>
        <v-divider vertical thickness="2"></v-divider>
        <v-col class="mt-2 mb-4">
          <div class="text-overline">
            Contenido multimedia
          </div>
          <v-carousel 
            class="rounded-sm mt-5 mb-5"
            height=450
            delimiter-icon="mdi-run"
          >
            <v-carousel-item
              src="https://media.licdn.com/dms/image/C4E03AQHxy8w942ADVA/profile-displayphoto-shrink_800_800/0/1613255611299?e=2147483647&v=beta&t=yiZfUAYvUq15IiUW-Vg-HnTD9_qnbXVRyy2YQ_wbt-I"
              cover
            ></v-carousel-item>
          <v-carousel-item
            src="https://cdn.vuetifyjs.com/images/cards/hotel.jpg"
            cover
          ></v-carousel-item>
          <v-carousel-item
            src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
            cover
          ></v-carousel-item>
        </v-carousel>
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
          this.plan = {
            "id": 1,
            "title": "Split",
            "type": "walk",
            "difficulty": 5,
            "description": "El split, conocido también como apertura de piernas, spagat o grand écart, es una posición física en la cual las piernas están alineadas en lateral o frontalmente (son colineales) una con la otra y están extendidas en direcciones opuestas."
          }
        }
      );
    }
  }
</script>