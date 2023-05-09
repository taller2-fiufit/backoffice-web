<template>
  <v-card flat>
    <v-container>
      <v-card-title id="title" class="text-center pb-10">Métricas Generales</v-card-title>
      <v-row>
        <v-col cols="6">
          <v-row>
            <v-col cols="12" class="my-0 py-0">
              <v-card-title class="pb-5">Métricas de Nuevos Entrenamientos</v-card-title>

              <v-card class="mx-auto">
                <v-row>
                  <v-col class="text-center mb-0 pb-5" cols="2">
                    <v-row justify="center">
                      <v-col cols="2">
                        <v-sheet
                          height="80"
                          width="80"
                          rounded
                          color="#9ACD32" 
                        >
                          <v-container fill-height fluid>
                            <v-row>
                              <v-col class="text-center">
                                <v-icon size="45">mdi-gymnastics</v-icon>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-sheet>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="10" class="mb-0 pb-0 text-center">
                    <v-card-text v-if="this.trainingPlansMetrics" class="pt-0">
                      <div class="overline grey--text" style="font-size: 15px !important;">
                        Entrenamientos creados
                      </div>
                      <div class="headline font-weight-medium grey--text text-center">
                        {{this.trainingPlansMetrics.trainingsCreated}}
                      </div>
                    </v-card-text>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
        <v-divider vertical class="my-2 vertical-divider"></v-divider>
        <v-col cols="6">
          <v-row>
            <v-col cols="12" class="my-0 py-0">
              <v-card-title class="pb-5">Métricas de Entrenamientos por Tipo</v-card-title>
              
              <v-card class="mx-auto">
                <v-row>
                  <v-col class="text-center mb-0 pb-5" cols="2">
                    <v-row justify="center">
                      <v-col cols="2">
                        <v-sheet
                          height="80"
                          width="80"
                          rounded
                          color="#9ACD32" 
                        >
                          <v-container fill-height fluid>
                            <v-row>
                              <v-col class="text-center">
                                <v-icon size="45">mdi-format-list-bulleted-type</v-icon>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-sheet>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="10" class="mb-0 pb-0 text-center">
                    <v-card-text v-if="this.trainingPlansMetrics" class="pt-0">
                      <div class="overline grey--text" style="font-size: 15px !important;">
                        Cantidad de Tipos de Entrenamientos
                      </div>
                      <div class="headline font-weight-medium grey--text text-center">
                        {{}}
                      </div>
                    </v-card-text>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>


      <v-row>
        <v-divider id="divider" horizontal class="my-4 horizontal-divider"></v-divider>
      </v-row>


      <v-card-title id="title" class="text-center py-5">Métricas Por Fecha</v-card-title>
      <v-form class="text-center" fast-fail @submit.prevent="handleTrainingSelectedDates">
        <span>Elegir Fecha de Inicio y Fin para generar los gráficos a lo largo del tiempo</span>
        <div>
          <ErrorAlert v-if="trainingsError" :error="trainingsError" />
        </div>

        <v-text-field v-model="trainingsStartDate" name="trainingsStartDate" type="date" label="Fecha de inicio" required class="dateInput1"></v-text-field>
        <v-text-field v-model="trainingsEndDate" name="trainingsEndDate" type="date" label="Fecha de fin" required class="dateInput2"></v-text-field>

        <v-btn type="submit" color="#9ACD32" class="mt-2 pb-20" :disabled="loading">
          <span
            v-show="loading"
            class="my-14 spinner-border spinner-border-sm"
          ></span>
          <span>Generar gráficos</span>
        </v-btn> 

        <v-divider horizontal class="my-4 horizontal-divider"></v-divider>
      </v-form>

      <v-row>
        <v-col cols="6" v-if="this.trainingPlansMetricsByDate">
          <v-row>
            <v-col cols="12" class="my-0 py-0">
              <v-card-title>Métricas de Nuevos Entrenamientos</v-card-title>
              <v-space></v-space>
              <v-card-text>Cantidad de Entrenamientos creados a lo largo del tiempo: {{this.trainingPlansMetricsByDate.trainingsCreated}}</v-card-text>
            </v-col>
          </v-row>
        </v-col>
        <v-divider vertical class="my-2 vertical-divider"></v-divider>
        <v-col cols="6" v-if="this.trainingPlansMetricsByDate">
          <v-row>
            <v-col cols="12" class="my-0 py-0">
              <v-card-title>Métricas de Entrenamientos por Tipo</v-card-title>
              <v-space></v-space>
              <v-card-text>Cantidad de Tipos de Entrenamientos a lo largo del tiempo: </v-card-text>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
  import MetricsService from '../services/metrics.service';
  import ErrorAlert from '../components/ErrorAlert.vue'
  import useVuelidate from '@vuelidate/core';
  import { required } from "@vuelidate/validators";
  import { BarChart, useBarChart } from 'vue-chart-3';
  import { Chart, registerables } from 'chart.js';
  import { computed, ref } from "vue";

  Chart.register(...registerables);

  export default {
    name: 'Metrics',
    components: {
      ErrorAlert,
      BarChart
    },
    data() {
      return {
        tab: null,
        // Selected dates
        v$: useVuelidate(),
        loading: false,
        trainingsStartDate: '',
        trainingsEndDate: '',
        trainingsError: '',
        // Metrics
        trainingPlansMetrics: null,
        trainingPlansMetricsByDate: null,
        // Training Charts
      };
    },
    created() {
      MetricsService.getTrainingPlansMetrics().then(
        (response) => {
          this.trainingPlansMetrics = response.data;
          console.log(this.trainingPlansMetrics) // borrar
        },
        (error) => {
        }
      );
    },
    methods: {
      // Training Selected Dates
      handleTrainingSelectedDates() {
        this.loading = true;
        this.v$.$validate()
        if (this.v$.$error) {
          this.trainingError = 'Falta completar los siguientes campos:';
          if (this.trainingStartDate == "") {
            this.trainingError += "<br>- Fecha de inicio"
          }
          if (this.trainingEndDate == "") {
            this.trainingError += "<br>- Fecha de fin"
          }
        } else {
          MetricsService.getTrainingPlansMetricsByDate(this.startDate, this.endDate).then(
            (response) => {
              this.trainingsError = null;
              this.trainingPlansMetricsByDate = response.data;
              console.log(this.trainingPlansMetricsByDate); // borrar

              this.createTrainingGraphsMetrics()
            },
            (error) => {
            }
          );
        }
        this.loading = false;
      },
      // Training Graphs
      createTrainingGraphsMetrics() {
      }
    },
    validations() {
      return {
        trainingsStartDate: { required },
        trainingsEndDate: { required },
      }
    }
  }
</script>

<style>
#title {
  font-size: 25px;
}

.dateInput1 {
  width: 20%;
  margin: auto;
  padding-top: 20px;
}

.dateInput2 {
  width: 20%;
  margin: auto;
}

#divider {
  border-width: 20px !important;
  border-color: #9ACD32 !important;
  width: 100%;
}
</style>