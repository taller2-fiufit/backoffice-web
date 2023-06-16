<template>
  <v-app-bar color="#9ACD32" class="flex-grow-0" app dark>
    <v-app-bar-title>Servicios</v-app-bar-title>
  </v-app-bar>

  <v-card class="mx-5 my-5 rounded-sm">
    <v-row justify="end">
      <v-dialog
        v-model="dialog"
        width="1024"
      >
        <template v-slot:activator="{ props }">
          <v-btn
            class="mr-15 mt-10"
            color="#9ACD32"
            v-bind="props"
          >
            Registrar nuevo servicio
          </v-btn>
        </template>
        <v-card color="#EAEAEA" class="rounded-sm">
          <v-row class="mt-2">
            <v-col cols="11" class="ml-3 mt-3">
              <v-card-title>
                <span class="text-h5">Datos del nuevo servicio</span>
              </v-card-title>
            </v-col>
          <v-btn icon @click="dialog = false" size="x-small" variant="text" class="mt-3 ml-2">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          </v-row>
          <v-card-text>
            <v-container>
                <v-form fast-fail @submit.prevent="handleRegister()">
                  <div>
                    <ErrorAlert v-if="successful == false" :error="message" />
                  </div>
                  <v-text-field
                    v-model="name"
                    class="mb-2"
                    label="Nombre del servicio"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="url"
                    class="mb-2"
                    label="URL del servicio"
                    required
                  ></v-text-field>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="9"
                    >
                      <v-text-field
                        v-model="path"
                        label="Path del servicio"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="3"
                    >
                      <v-select
                        v-model="blocked"
                        :items="['Si', 'No']"
                        label="Bloqueado"
                        required
                      ></v-select>
                    </v-col>
                  </v-row>
                  <v-btn type="submit" color="#9ACD32" block class="my-5" :disabled="register_loading">
                    <span
                      class="my-14 spinner-border spinner-border-sm"
                    ></span>
                    <span>Registrar servicio</span>
                  </v-btn> 
                </v-form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>

    <div id="table-div" class="pl-15">
      <ServicesTable v-if="servicesList" :headers="headers" :items="servicesList" :loading="loading"/>
    </div>
  </v-card>
</template>
  
  
<script>
  import ServicesService from '../services/services.service';
  import ServicesTable from '../components/ServicesTable.vue';
  import ErrorAlert from '../components/ErrorAlert.vue';
  import useVuelidate from '@vuelidate/core';
  import { required } from "@vuelidate/validators";
  export default {
    name: 'Services',
    components: {
      ServicesTable,
      ErrorAlert
    },
    data() {
      return {
        headers: [  
          { text: "#", value: "id", sortable: true},
          { text: "NOMBRE", value: "name", sortable: true},
          { text: "DETALLE", value: "actions"}
        ],
        servicesList: [],
        loading: true,
        v$: useVuelidate(),
        successful: null,
        name: "",
        url: "",
        path: "",
        blocked: "",
        register_loading: false,
        message: "",
        dialog: false
      }
    },
    async mounted() {
      await ServicesService.getServiceList().then(
        (response) => {
          this.servicesList = response.data;
        },
        (error) => {
          this.servicesList = [];
        }
      );
      this.loading = false;
    },

    methods: {
      handleRegister() {
        this.register_loading = true;
        this.v$.$validate()
        if (this.v$.$error) {
          this.successful = false;
          this.message = 'Falta completar los siguientes campos:';
          if (this.name == "") {
            this.message += "<br>- nombre del servicio"
          }
          if (this.url == "") {
            this.message += "<br>- URL del servicio"
          }
          if (this.path == "") {
            this.message += "<br>- path del servicio"
          }
          if (this.blocked == "") {
            this.message += "<br>- bloqueado"
          }
          console.log(this.successful)
        } else {
          let service = {
            name: this.name,
            url: this.url,
            path: this.path,
            blocked: this.blocked == "Si" ? true : false
          };
          ServicesService.registerNewService(service).then(
            (_) => {
              this.successful = true;
              this.dialog = false;
              this.$router.go();
            },
            (error) => {
              console.log(error);
              this.successful = false;
              this.message = error.message;
            }
          );
        }
        this.register_loading = false;
      },
    },
    validations() {
      return {
        name: { required },
        url: { required },
        path: { required },
        blocked: { required }
      }
    }
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