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
    <v-sheet :color="this.plan.blocked ? '#FF0000' : '#9ACD32'" height="6"></v-sheet>
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
          <v-row v-if="this.plan.blocked" justify="center" class="mt-4">
            <v-chip color='#FF0000' text-color="white"> BLOCKED </v-chip>
          </v-row>
          <p class="text-caption text-center mx-5 mt-7"> {{ plan.description }} </p>
          <v-row>
            <v-col cols="8" offset="2" class="mt-10">
              <v-row>
                <v-col cols="4" class="ml-4">
                  <v-text-field
                    :value="plan.id"
                    label="ID"
                    prepend-icon="mdi-pound"
                    readonly
                    variant="underlined"
                    persistent-placeholder
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    class="ml-4"
                    :value="plan.createdAt.split('T')[0]"
                    label="Fecha de registro"
                    prepend-icon="mdi-calendar-outline"
                    readonly
                    variant="underlined"
                    persistent-placeholder
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4" class="ml-4">
                  <v-text-field
                    :value="plan.author"
                    label="Author ID"
                    prepend-icon="mdi-run"
                    readonly
                    variant="underlined"
                    persistent-placeholder
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    class="ml-4"
                    :value="plan.difficulty"
                    label="Difficulty"
                    prepend-icon="mdi-weight-lifter"
                    readonly
                    variant="underlined"
                    persistent-placeholder
                    suffix="pts"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
        <v-divider vertical thickness="2"></v-divider>
        <v-col class="mt-2 mb-4">
          <v-row>
            <v-col>
            <div class="text-overline">
              Contenido multimedia
            </div>
            </v-col>
            <v-btn
              color="#FF0000"
              size="small"
              v-on:click="()=>isBlocked?unblockPlan():blockPlan()"
              :disabled="block_loading"
              class="my-4 mr-4"
            >
              <v-icon class="mr-2">
                mdi-block-helper
              </v-icon>
              {{ isBlocked ? 'DESBLOQUEAR' : 'BLOQUEAR' }}
            </v-btn>
            
          </v-row>
          <v-carousel
            v-if="!loading" 
            class="rounded-sm mt-5 mb-5"
            height=450
            delimiter-icon="mdi-run"
          >
            <v-carousel-item
              v-for="(url, i) in media"
              :key="i"
              :src="url"
              cover
            ></v-carousel-item>

            <v-carousel-item v-if="media.length === 0">
              <v-sheet
                color="#E2E2E2"
                height="100%"
                tile
              >
                <div class="d-flex fill-height justify-center align-center text-h4">
                  No hay contenido multimedia disponible.
                </div>
              </v-sheet>
            </v-carousel-item>
          </v-carousel>
        </v-col>
      </v-row>
    </v-card-item>
  </v-card>
  <v-row>
    <v-col cols="6" offset="3">
      <v-card class="mx-5 rounded-sm">
        <v-card-item class="my-3 mb-5">
          <div class="text-overline mb-6">
            Metas
          </div>
          <v-row class="mx-10 mb-1" v-for="(goal, index) in plan.goals" :key="index">
            <div class="font-weight-bold">
              <v-icon end icon="mdi-pin-outline" class="goalicon"></v-icon>
              Meta {{ index + 1 }}
            </div>
            <div>
              : {{ goal.name }}
            </div>
          </v-row>
        </v-card-item>
      </v-card>
    </v-col> 
  </v-row>
  </div>
</template>

<script>
  import TrainingPlanService from '../services/training-plan.service';

  export default {
    name: 'PlansDetail',
    data() {
      return {
        plan: null,
        media: [],
        loading: true,
        block_loading: false,
      }
    },
    async mounted() {
      let response = await TrainingPlanService.getTrainingPlanInfoById(this.$route.params.id);
      this.plan = response.data;
      console.log(this.plan);

      for (var index in this.plan.multimedia) {
        media.push(await generateMediaURL('trainings/' + this.plan.id + '/' + this.plan.multimedia[index]));
      };

      this.loading = false;
    },
    computed: {
      isBlocked() {
        return this.plan.blocked
      }
    },
    methods: {
      blockPlan() {
        this.block_loading = true;
        TrainingPlanService.blockPlan(this.plan.id).then(
          (response) => {
            this.plan.blocked = response.data.blocked;
            this.block_loading = false
          },
          (_) => [
            this.block_loading = false
          ]
        )
      },
      unblockPlan() {
        this.block_loading = true;
        TrainingPlanService.unblockPlan(this.plan.id).then(
          (response) => {
            this.plan.blocked = response.data.blocked;
            this.block_loading = false
          },
          (_) => [
            this.block_loading = false
          ]
        )
      },
    }
  }
</script>

<style>
.rounded-sm {
  background: #F7F7F7;
}
.ml-4 .v-icon {
  color: #7CA528 !important;
}
.goalicon {
  color: #7CA528 !important;
}
</style>