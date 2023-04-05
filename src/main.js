import { createApp } from 'vue'
import App from './App.vue'
import '@mdi/font/css/materialdesignicons.css'
import router from './router'
import store from './store'
import './axios'
// import store from './vuex'

// import * as Vue from 'vue/dist/vue.common.js'
// 
// var Vue = require('vue')
// Vue.prototype.$store = store;

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App)
app.use(vuetify)
app.use(router)
app.use(store)
app.mount('#app')

