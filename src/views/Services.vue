<template>
  <v-app-bar color="#9ACD32" class="flex-grow-0" app dark>
    <v-app-bar-title>Servicios</v-app-bar-title>
  </v-app-bar>

  <v-card class="mx-5 my-5 rounded-sm">
    <v-row class="mt-5">
      <v-col cols="8" class="ml-15 mt-4">
        <v-textarea v-if="apikey != ''" readonly="true" bg-color="#d1e69d" persistent-placeholder label="Success" :model-value="'El servicio se agregó correctamente con la api-key: ' + apikey" prepend-inner-icon="mdi-check" rows="1" variant="solo"></v-textarea>
      </v-col>
      <v-col cols="3" class="ml-3">
        <v-row justify="end">
        <v-dialog

          v-model="dialog"
          width="1024"
        >
          <template v-slot:activator="{ props }">
            <v-btn
              class="my-10 mb-5"
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
      </v-col>
    </v-row>

    <div id="table-div" class="pl-15">
      <ServicesTable v-if="servicesList" :headers="headers" :items="servicesList" :loading="loading" :error="error" @change_block_filter="updateBlockFilter" @change_up_filter="updateUpFilter" @delete_service="deleteService"/>
    </div>
  </v-card>
</template>

<script>
import ServicesService from '../services/services.service'
import ServicesTable from '../components/ServicesTable.vue'
import ErrorAlert from '../components/ErrorAlert.vue'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
export default {
  name: 'ServicesView',
  components: {
    ServicesTable,
    ErrorAlert
  },
  data () {
    return {
      headers: [
        { text: '#', value: 'id', sortable: true },
        { text: 'SERVICIO', value: 'service' },
        { text: 'FUNCIONANDO', value: 'up' },
        { text: 'ACCIONES', value: 'actions' }
      ],
      servicesList: [],
      loading: true,
      v$: useVuelidate(),
      successful: null,
      apikey: '',
      name: '',
      url: '',
      path: '',
      blocked: '',
      register_loading: false,
      message: '',
      dialog: false,
      error: false,
      blocked_filtering: '-',
      up_filtering: '-'
    }
  },
  async mounted () {
    ServicesService.getServiceList(this.blocked_filtering, this.up_filtering).then(
      (response) => {
        this.servicesList = response.data
        this.loading = false
      },
      () => {
        this.error = true
        this.loading = false
      }
    )
  },

  methods: {
    async updateBlockFilter (val) {
      this.loading = true
      this.blocked_filtering = val
      const response = await ServicesService.getServiceList(this.blocked_filtering, this.up_filtering)
      this.servicesList = response.data
      this.loading = false
    },

    async updateUpFilter (val) {
      this.loading = true
      this.up_filtering = val
      const response = await ServicesService.getServiceList(this.blocked_filtering, this.up_filtering)
      this.servicesList = response.data
      this.loading = false
    },

    async deleteService (val) {
      const index = this.servicesList.map(x => {
        return x.id
      }).indexOf(val)
      this.servicesList.splice(index, 1)
    },

    handleRegister () {
      this.register_loading = true
      this.v$.$validate()
      if (this.v$.$error) {
        this.successful = false
        this.message = 'Falta completar los siguientes campos:'
        if (this.name === '') {
          this.message += '<br>- nombre del servicio'
        }
        if (this.url === '') {
          this.message += '<br>- URL del servicio'
        }
        if (this.path === '') {
          this.message += '<br>- path del servicio'
        }
        if (this.blocked === '') {
          this.message += '<br>- bloqueado'
        }
      } else {
        const service = {
          name: this.name,
          url: this.url,
          path: this.path,
          blocked: this.blocked === 'Si'
        }
        ServicesService.registerNewService(service).then(
          (response) => {
            service.id = response.data.id
            this.servicesList.push(service)
            this.successful = true
            this.dialog = false
            this.apikey = response.data.apikey
          },
          (error) => {
            this.successful = false
            this.message = error.message
          }
        )
      }
      this.register_loading = false
    }
  },
  validations () {
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
