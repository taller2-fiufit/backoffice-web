<template>
    <v-card flat>
        <v-container>
          <v-card-title class="text-center pb-10">Métricas Generales</v-card-title>
          <v-row>
            <v-col cols="6">
              <v-row>
                <v-col cols="12" class="my-0 py-0">
                  <v-card-title>Métricas de Nuevos Entrenamientos</v-card-title>
                  <v-space></v-space>
                  <v-card-text>Cantidad de Entrenamientos creados: {{this.trainingPlansMetrics.trainingsCreated}}</v-card-text>
                </v-col>
              </v-row>
            </v-col>
            <v-divider vertical class="my-2 vertical-divider"></v-divider>
            <v-col cols="6">
              <v-row>
                <v-col cols="12" class="my-0 py-0">
                  <v-card-title>Métricas de Entrenamientos por Tipo</v-card-title>
                  <v-space></v-space>
                  <v-card-text>Cantidad de Tipos de Entrenamientos: </v-card-text>
                </v-col>
              </v-row>
            </v-col>
            <v-divider horizontal class="my-4 horizontal-divider"></v-divider>
            <v-card-title class="text-center py-5">Métricas Por Fecha</v-card-title>
            <v-col cols="12">
              <v-form fast-fail @submit.prevent="handleTrainingSelectedDates">
                <span>Elegir Fecha de Inicio y Fin para generar los gráficos a lo largo del tiempo</span>
                <div>
                  <ErrorAlert v-if="trainingsError" :error="trainingsError" />
                </div>

                <v-text-field v-model="trainingsStartDate" name="trainingsStartDate" type="date" label="Fecha de inicio" required></v-text-field>
                <v-text-field v-model="trainingsEndDate" name="trainingsEndDate" type="date" label="Fecha de fin" required></v-text-field>

                <v-btn type="submit" color="#9ACD32" block class="mt-2">
                  <span
                    class="my-14 spinner-border spinner-border-sm"
                  ></span>
                  <span>Generar gráficos</span>
                </v-btn> 
              </v-form>
            </v-col>
            <v-space></v-space>
            <v-col cols="6">
              <v-row>
                <v-col cols="12" class="my-0 py-0">
                  <v-card-title>Métricas de Nuevos Entrenamientos</v-card-title>
                  <v-space></v-space>
                  <v-card-text>Cantidad de Entrenamientos creados a lo largo del tiempo</v-card-text>
                </v-col>
              </v-row>
            </v-col>
            <v-divider vertical class="my-2 vertical-divider"></v-divider>
            <v-col cols="6">
              <v-row>
                <v-col cols="12" class="my-0 py-0">
                  <v-card-title>Métricas de Entrenamientos por Tipo</v-card-title>
                  <v-space></v-space>
                  <v-card-text></v-card-text>
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

          this.createTrainingGraphsMetrics()
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
              this.trainingPlansMetricsByDate = response.data;
              console.log(this.trainingPlansMetricsByDate); // borrar

              this.createTrainingGraphsMetricsByDate()
            },
            (error) => {
            }
          );
        }
        this.loading = false;
      },
      // Training Graphs
      createTrainingGraphsMetrics() {
      },
      // Training Graphs by date
      createTrainingGraphsMetricsByDate() {  
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
</style>