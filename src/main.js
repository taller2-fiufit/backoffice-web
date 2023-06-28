import { createApp } from 'vue'
import App from './App.vue'
import '@mdi/font/css/materialdesignicons.css'
import router from './router'
import store from './store'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import Vue3EasyDataTable from 'vue3-easy-data-table'
import 'vue3-easy-data-table/dist/style.css'

import VueGoogleMaps from '@fawmi/vue-google-maps'

const vuetify = createVuetify({
  components,
  directives
})

const app = createApp(App)
app.component('DataTable', Vue3EasyDataTable)
app.use(vuetify)
app.use(router)
app.use(store)
app.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAssFjab4k-XUhfaa6sDKuG_joeqmRe4rA'
  }
})
app.mount('#app')
