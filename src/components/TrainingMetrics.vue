<template>
  <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
  <v-card class="rounded-sm" flat>
    <v-container>
      <v-card-title id="title" class="text-center pb-5">Métricas Generales</v-card-title>
      <v-form class="text-center" fast-fail @submit.prevent="handleTrainingSelectedDates">
        <div style="font-size: 20px !important;">Elegir fecha de inicio y fin para generar los gráficos a lo largo del tiempo.</div>
        <div class="text-caption text-center mx-5"> Por default, las métricas generadas son de la última semana. </div>
        <div>
          <ErrorAlert v-if="trainingsError" :error="trainingsError" />
        </div>

        <v-text-field v-model="trainingsStartDate" name="trainingsStartDate" type="date" label="Fecha de inicio" required class="dateInput1"></v-text-field>
        <v-text-field v-model="trainingsEndDate" name="trainingsEndDate" type="date" label="Fecha de fin" required class="dateInput2"></v-text-field>

        <v-btn type="submit" color="#9ACD32" class="mt-2 mb-7" :disabled="loading">
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

  <v-card class="rounded-sm" flat>
    <v-container>
      <v-row>
        <v-col cols="6" offset="3">
          <v-row>
            <v-col cols="12" class="my-0 py-0">
              <v-card-title class="pb-3">Métricas de Nuevos Entrenamientos</v-card-title>

              <v-card class="mx-auto mb-10">
                <v-row class="my-5">
                  <v-col class="text-center mb-0 pb-0" cols="2">
                    <v-row justify="center">
                      <v-col cols="2">
                        <v-sheet
                          height="80"
                          width="80"
                          rounded
                          color="#9ACD32"
                          class="mb-3"
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
                    <v-card-text v-if="this.trainingPlansMetrics" class="pt-2">
                      <div class="text-overline font-weight-medium" style="font-size: 12px !important;">
                        Entrenamientos creados
                      </div>
                      <div class="text-overline font-weight-bold" style="font-size: 15px !important;">
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
  <v-divider horizontal class="my-4 mx-3 horizontal-divider"></v-divider>
  <v-card class="rounded-sm mb-10" flat>
    <v-container>
      <v-row>
        <v-col cols="6">
          <v-row>
            <v-col cols="12" class="my-0 py-0">
              <v-card-title class="pb-5">Métricas de Entrenamientos por Tipo</v-card-title>
              
              <v-card class="mx-auto">
                <v-row class="my-5">
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
                      <div v-if="this.trainingPlansMetrics.length">
                        <div class="text-overline font-weight-medium" style="font-size: 12px !important;">
                          Cantidad de Entrenamientos por Tipo
                        </div>
                        <div>
                          <DoughnutChart class="doughnut-chart" v-bind="this.typeOfTrainingsDoughnutChartProps" />
                        </div>
                      </div>
                      <div v-if="!this.trainingPlansMetrics.length">
                        <div class="text-overline font-weight-medium" style="font-size: 12px !important;">
                          Cantidad de Entrenamientos por Tipo
                        </div>
                        <div class="headline font-weight-medium grey--text text-center">
                          0
                        </div>
                      </div>
                    </v-card-text>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
        <v-divider vertical class="my-2 vertical-divider mb-5"></v-divider>
        <v-col cols="6">
          <v-row>
            <v-col cols="12" class="my-0 py-0">
              <v-card-title class="pb-5">Métricas de Entrenamientos por Dificultad</v-card-title>
              
              <v-card class="mx-auto">
                <v-row class="my-5">
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
                      <div v-if="this.trainingPlansMetrics.length">
                        <div class="text-overline font-weight-medium" style="font-size: 12px !important;">
                          Cantidad de Entrenamientos por Dificultad
                        </div>
                        <div>
                          <BarChart class="mx-6 bar-chart" v-bind="this.difficultyOfTrainingsBarChartProps" />
                        </div>
                      </div>
                      <div v-if="!this.trainingPlansMetrics.length">
                        <div class="text-overline font-weight-medium" style="font-size: 12px !important;">
                          Cantidad de Entrenamientos por Dificultad
                        </div>
                        <div v-if="!this.trainingPlansMetrics.length" class="headline font-weight-medium grey--text text-center">
                          0
                        </div>
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
  <v-divider horizontal class="my-4 mx-3 horizontal-divider"></v-divider>
  <v-card class="rounded-sm" flat>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-row>
            <v-col cols="12" class="my-0 py-0">
              <v-card-title class="pb-3">Métricas de Entrenamientos por Usuario</v-card-title>

              <v-card class="mx-auto mb-5">
                <v-row class="my-5">
                  <v-col class="text-center mb-0 pb-5" cols="2">
                    <v-row>
                      <v-col cols="1">
                        <v-sheet
                          height="80"
                          width="80"
                          rounded
                          color="#9ACD32"
                          class="ml-14"
                        >
                          <v-container fill-height fluid>
                            <v-row>
                              <v-col class="text-center">
                                <v-icon size="45">mdi-account</v-icon>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-sheet>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="9" class="mb-0 pb-0 text-center">
                    <v-card-text v-if="this.trainingPlansMetrics" class="pt-0">
                      <div class="text-overline font-weight-medium" style="font-size: 12px !important;">
                        Cantidad de Entrenamientos creados por Usuario
                      </div>
                      <div class="pb-5">
                        <TrainingMetricsUsersTable :headers="headers" :items="trainingMetricsUsersTableData" />
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
  import TrainingMetricsUsersTable from '../components/TrainingMetricsUsersTable.vue'
  import useVuelidate from '@vuelidate/core';
  import { required } from "@vuelidate/validators";
  import { BarChart, DoughnutChart, useBarChart } from 'vue-chart-3';
  import { Chart, registerables } from 'chart.js';
  import { computed, ref } from "vue";

  Chart.register(...registerables);

  export default {
    name: 'Metrics',
    components: {
      ErrorAlert,
      BarChart,
      DoughnutChart,
      TrainingMetricsUsersTable
    },
    data() {
      return {
        tab: null,
        dialog: true,
        // Selected dates
        v$: useVuelidate(),
        loading: false,
        trainingsStartDate: '',
        trainingsEndDate: '',
        trainingsError: '',
        // Metrics
        trainingPlansMetrics: null,
        // Training Charts
        typeOfTrainingsDoughnutChartProps: null,
        difficultyOfTrainingsBarChartProps: null,
        // Training Plans Created by Users Table
        headers: [  
          { text: "ID DE USUARIO", value: "id", sortable: true},
          { text: "CANTIDAD", value: "trainings", sortable: true},
          { text: "DIFICULTAD PROMEDIO", value: "averageDifficulty", sortable: true},
          { text: "TIPOS", value: "types", sortable: false}
        ],
        trainingMetricsUsersTableData: [],
      };
    },
    created() {
      const today = new Date();

      // startDate
      const lastWeek = new Date(today.getTime() - (7 * 24 * 60 * 60 * 1000));
      const startDate = this.formatDate(lastWeek);

      // endDate
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      const endDate = this.formatDate(tomorrow);

      MetricsService.getTrainingPlansMetricsByDate(startDate, endDate).then(
        (response) => {
          this.trainingPlansMetrics = response.data;

          this.createTrainingGraphsMetrics()
        },
        (error) => {
        }
      );
    },
    methods: {
      // Format date
      formatDate(date) {
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        // Format the date as yyyy-mm-dd
        if (month < 10) {
          month = '0' + month;
        }
        if (day < 10) {
          day = '0' + day;
        }
        let formattedDate = year + '-' + month + '-' + day;
        return formattedDate;
      },
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
              this.trainingPlansMetrics = response.data;
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
        this.createTypeOfTrainingsDoughnutChart();
        this.createTrainingsDifficultyBarChart();
        this.createTrainingMetricsUsersTable();
      },
      createTypeOfTrainingsDoughnutChart() {
        const trainingsType = new Map();
        for (const training of this.trainingPlansMetrics) {
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

        this.typeOfTrainingsDoughnutChartProps = barChartProps;
      },
      createTrainingsDifficultyBarChart() {
        const trainingsDifficulty = new Map();
        for (const training of this.trainingPlansMetrics) {
          const difficulty = training.attrs.difficulty;
          if (trainingsDifficulty.has(difficulty)) {
            trainingsDifficulty.set(difficulty, trainingsDifficulty.get(difficulty) + 1);
          } else {
            trainingsDifficulty.set(difficulty, 1);
          }
        }

        let labels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
        let amount = [0,0,0,0,0,0,0,0,0,0];
        trainingsDifficulty.forEach((value, key) => {
          amount[key-1] = value;
        });

        const data = ref(amount);


        const chartData = computed(() => ({
          labels: labels,
          datasets: [
            {
              label: [""],
              data: data.value,
              backgroundColor: ["#9ACD32"]
            },
          ],
        }));

        const { barChartProps, barChartRef } = useBarChart({ chartData });

        this.difficultyOfTrainingsBarChartProps = barChartProps;
      },
      createTrainingMetricsUsersTable() {
        const usersTrainingGroupById = new Map();
        for (const training of this.trainingPlansMetrics) {
          const userId = training.attrs.author;
          const difficulty = training.attrs.difficulty;
          const type = training.attrs.type;

          if (usersTrainingGroupById.has(userId)) {
            const userTrainingsQuantity = usersTrainingGroupById.get(userId)["quantity"];
            const difficulties = usersTrainingGroupById.get(userId)["difficulties"];
            const types = usersTrainingGroupById.get(userId)["types"];
            types.add(type);
            usersTrainingGroupById.set(userId, {
              quantity: userTrainingsQuantity + 1,
              difficulties: difficulties + difficulty,
              types: types
            });
          } else {
            const types = new Set()
            types.add(type);
            usersTrainingGroupById.set(userId, {
              quantity: 1,
              difficulties: difficulty,
              types: types
            })
          }
        }

        const usersData = [];
        usersTrainingGroupById.forEach((value, key) => {
          const typesSet = value["types"];
          const typesArray = Array.from(typesSet);
          const typesString = typesArray.join(', ')
          usersData.push({
            id: key,
            trainings: value["quantity"],
            averageDifficulty: value["difficulties"] / value["quantity"],
            types: typesString
          })
        });

        this.trainingMetricsUsersTableData = usersData;
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
.rounded-sm {
  background: #F7F7F7;
}

.dialog {
  margin-left: 250px;
}
#title {
  font-size: 25px;
}

.bar-chart {
  height: 250px;
  width: 550px;
  align-self: center;
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