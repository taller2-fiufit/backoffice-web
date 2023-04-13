import { createApp } from 'vue'
import App from './App.vue'
import '@mdi/font/css/materialdesignicons.css'
import router from './router'
import store from './store'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VDataTable } from 'vuetify/labs/VDataTable'
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';

const vuetify = createVuetify({
  components,
  directives,
  VDataTable,
})

const app = createApp(App)
app.component('Datatable', Vue3EasyDataTable);
app.use(vuetify)
app.use(router)
app.use(store)
app.mount('#app')

