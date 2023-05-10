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
                      <div class="overline grey--text" style="font-size: 30x !important;">
                        Entrenamientos creados
                      </div>
                      <div class="headline font-weight-medium grey--text text-center">
                        {{this.trainingPlansMetrics.length}}
                      </div>
                    </v-card-text>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
  <v-card flat>
    <v-container>
      <v-row>
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
                        Cantidad de Entrenamientos por Tipo
                      </div>
                      <div v-if="this.trainingPlansMetrics.length">
                        <DoughnutChart class="doughnut-chart" v-bind="this.typeOfTrainingsDoughnutChartProps" />
                      </div>
                      <div v-if="!this.trainingPlansMetrics.length" class="headline font-weight-medium grey--text text-center">
                        0
                      </div>
                    </v-card-text>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="6">
          <v-row>
            <v-col cols="12" class="my-0 py-0">
              <v-card-title class="pb-5">Métricas de Entrenamientos por Dificultad</v-card-title>
              
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
                                <v-icon size="45">mdi-podium</v-icon>
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
                        Cantidad de Entrenamientos por Dificultad
                      </div>
                      <div>
                        <DoughnutChart v-if="this.trainingPlansMetrics.length" class="doughnut-chart" v-bind="this.difficultyOfTrainingsDoughnutChartProps" />
                      </div>
                      <div v-if="!this.trainingPlansMetrics.length" class="headline font-weight-medium grey--text text-center">
                        0
                      </div>
                    </v-card-text>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-card>

  <v-divider id="divider" horizontal class="my-4 horizontal-divider"></v-divider>

  <v-card flat>
    <v-container>
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
    </v-container>
  </v-card>

  <v-card flat>
    <v-container>
      <v-row>
        <v-col cols="6" v-if="this.trainingPlansMetricsByDate">
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
                    <v-card-text v-if="this.trainingPlansMetricsByDate" class="pt-0">
                      <div class="overline grey--text" style="font-size: 15px !important;">
                        Entrenamientos creados
                      </div>
                      <div class="headline font-weight-medium grey--text text-center">
                        {{this.trainingPlansMetricsByDate.length}}
                      </div>
                    </v-card-text>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
    
  <v-card flat>
    <v-container>
      <v-row>  
        <v-col cols="6" v-if="this.trainingPlansMetricsByDate">
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
                    <v-card-text v-if="this.trainingPlansMetricsByDate" class="pt-0">
                      <div class="overline grey--text" style="font-size: 15px !important;">
                        Cantidad de Entrenamientos por Tipo
                      </div>
                      <div v-if="this.trainingPlansMetricsByDate.length">
                        <DoughnutChart class="doughnut-chart" v-bind="this.typeOfTrainingsDoughnutChartPropsByDate" />
                      </div>
                      <div v-if="!this.trainingPlansMetricsByDate.length" class="headline font-weight-medium grey--text text-center">
                        0
                      </div>
                    </v-card-text>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="6" v-if="this.trainingPlansMetricsByDate">
          <v-row>
            <v-col cols="12" class="my-0 py-0">
              <v-card-title class="pb-5">Métricas de Entrenamientos por Dificultad</v-card-title>
              
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
                                <v-icon size="45">mdi-podium</v-icon>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-sheet>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="10" class="mb-0 pb-0 text-center">
                    <v-card-text v-if="this.trainingPlansMetricsByDate" class="pt-0">
                      <div class="overline grey--text" style="font-size: 15px !important;">
                        Cantidad de Entrenamientos por Dificultad
                      </div>
                      <div>
                        <DoughnutChart v-if="this.trainingPlansMetricsByDate.length" class="doughnut-chart" v-bind="this.difficultyOfTrainingsDoughnutChartPropsByDate" />
                      </div>
                      <div v-if="this.trainingPlansMetricsByDate.length == 0" class="headline font-weight-medium grey--text text-center">
                        0
                      </div>
                    </v-card-text>
                  </v-col>
                </v-row>
              </v-card>
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
  import { DoughnutChart, useBarChart } from 'vue-chart-3';
  import { Chart, registerables } from 'chart.js';
  import { computed, ref } from "vue";

  Chart.register(...registerables);

  export default {
    name: 'Metrics',
    components: {
      ErrorAlert,
      DoughnutChart
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
        typeOfTrainingsDoughnutChartProps: null,
        difficultyOfTrainingsDoughnutChartProps: null,
        // Training Charts By Date
        typeOfTrainingsDoughnutChartPropsByDate: null,
        difficultyOfTrainingsDoughnutChartPropsByDate: null
      };
    },
    created() {
      MetricsService.getTrainingPlansMetrics().then(
        (response) => {
          this.trainingPlansMetrics = response.data;

          this.createTrainingGraphsMetrics(false)
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
          this.trainingsError = 'Falta completar los siguientes campos:';
          if (this.trainingsStartDate == "") {
            this.trainingsError += "<br>- Fecha de inicio"
          }
          if (this.trainingsEndDate == "") {
            this.trainingsError += "<br>- Fecha de fin"
          }
          this.loading = false;
          return
        } 
        
        const startDate = new Date(this.trainingsStartDate);
        const endDate = new Date(this.trainingsEndDate);
        if (startDate > endDate) {
          this.trainingsError = 'La fecha de fin no puede ser luego de la fecha de inicio';
          this.loading = false;
          return
        }

        const actualDate = new Date();
        const tomorrow = new Date(actualDate)
        tomorrow.setDate(tomorrow.getDate() + 1)
        if (startDate > actualDate || endDate > tomorrow) {
          this.trainingsError = 'Las fechas seleccionadas no pueden ser mayores al día actual';
        } else {
          MetricsService.getTrainingPlansMetricsByDate(this.trainingsStartDate, this.trainingsEndDate).then(
            (response) => {
              this.trainingsError = null;
              this.trainingPlansMetricsByDate = response.data;
              this.createTrainingGraphsMetrics(true)
            },
            (error) => {
            }
          );
        }
        this.loading = false;
      },
      // Training Graphs
      createTrainingGraphsMetrics(byDate) {
        this.createTypeOfTrainingsDoughnutChart(byDate);
        this.createfTrainingsDifficultyChart(byDate);
      },
      createTypeOfTrainingsDoughnutChart(byDate) {
        const trainingMetrics = byDate ? this.trainingPlansMetricsByDate : this.trainingPlansMetrics;

        const trainingsType = new Map();
        for (const training of trainingMetrics) {
          const type = training.attrs.type;
          if (trainingsType.has(type)) {
            trainingsType.set(type, trainingsType.get(type) + 1);
          } else {
            trainingsType.set(type, 1)
          }
        }

        let labels = [];
        let amount = [];
        trainingsType.forEach((value, key) => {
          labels.push(key);
          amount.push(value)
        });

        const data = ref(amount);

        const chartData = computed(() => ({
          labels: labels,
          datasets: [
            {
              data: data.value,
              backgroundColor: ["#9ACD32", "#2b3c4b", "#E2E2E2"]
            },
          ],
        }));

        const { barChartProps, barChartRef } = useBarChart({ chartData });

        if (byDate) {
          this.typeOfTrainingsDoughnutChartPropsByDate = barChartProps;
        } else {
          this.typeOfTrainingsDoughnutChartProps = barChartProps;
        }
      },
      createfTrainingsDifficultyChart(byDate) {
        const trainingMetrics = byDate ? this.trainingPlansMetricsByDate : this.trainingPlansMetrics;

        const trainingsDifficulty = new Map();
        for (const training of trainingMetrics) {
          const difficulty = training.attrs.difficulty;
          if (trainingsDifficulty.has(difficulty)) {
            trainingsDifficulty.set(difficulty, trainingsDifficulty.get(difficulty) + 1);
          } else {
            trainingsDifficulty.set(difficulty, 1)
          }
        }

        let labels = [];
        let amount = [];
        trainingsDifficulty.forEach((value, key) => {
          labels.push(key);
          amount.push(value)
        });

        const data = ref(amount);

        const chartData = computed(() => ({
          labels: labels,
          datasets: [
            {
              data: data.value,
              backgroundColor: ["#9ACD32", "#2b3c4b", "#E2E2E2"]
            },
          ],
        }));

        const { barChartProps, barChartRef } = useBarChart({ chartData });

        if (byDate) {
          this.difficultyOfTrainingsDoughnutChartPropsByDate = barChartProps;
        } else {
          this.difficultyOfTrainingsDoughnutChartProps = barChartProps;
        }
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

.doughnut-chart {
  height: 250px;
  width: 600px;
  align-self: center;
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