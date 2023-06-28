<template>
  <v-app-bar color="#9ACD32" class="flex-grow-0" app dark>
    <v-app-bar-title>Registro</v-app-bar-title>
  </v-app-bar>

  <div class="d-flex align-center justify-center" style="height: 80vh">
      <v-sheet width="400" class="mx-auto">
        <v-img
          max-height="150"
          :src="require('@/assets/admin-logo.png')"
          alt="kinetix logo"
          class="my-10 pointer"
        ></v-img>

        <v-form fast-fail @submit.prevent="handleRegister">

          <div>
            <ErrorAlert v-if="successful == false" :error="message" />
          </div>

          <div>
            <SuccessAlert v-if="successful" :message="message" />
          </div>

          <div>
            <v-text-field
              v-model="fullname"
              name="fullname"
              label="Nombre completo"
              type="text"
              placeholder="fullname"
              required
            ></v-text-field>

            <v-text-field
              v-model="email"
              name="email"
              label="Correo electrónico"
              type="email"
              placeholder="email"
              required
            ></v-text-field>

            <v-text-field
              v-model="password"
              name="password"
              label="Contraseña"
              type="password"
              placeholder="password"
              required
            ></v-text-field>

            <v-text-field
              v-model="confirmPassword"
              name="confirmPassword"
              label="Confirmar contraseña"
              type="password"
              placeholder="confirm password"
              required
            ></v-text-field>

            <v-btn type="submit" color="#9ACD32" :disabled="loading" block class="mt-2">
              <span
                class="my-14 spinner-border spinner-border-sm"
              ></span>
              <span>Registrar administrador</span>
            </v-btn>
          </div>
        </v-form>
      </v-sheet>
  </div>
</template>

<script>
import User from '../models/user'
import ErrorAlert from '../components/ErrorAlert.vue'
import SuccessAlert from '../components/SuccessAlert.vue'
import UserService from '../services/user.service'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default {
  name: 'RegisterView',
  components: {
    ErrorAlert,
    SuccessAlert
  },
  data () {
    return {
      v$: useVuelidate(),
      successful: null,
      message: '',
      fullname: '',
      password: '',
      email: '',
      confirmPassword: ''
    }
  },
  methods: {
    handleRegister () {
      this.loading = true
      const user = new User(this.fullname, this.email, this.password)
      this.v$.$validate()
      if (this.v$.$error) {
        this.successful = false
        this.message = 'Falta completar los siguientes campos:'
        if (this.fullname === '') {
          this.message += '<br>- nombre completo'
        }
        if (this.email === '') {
          this.message += '<br>- correo electrónico'
        }
        if (this.password === '') {
          this.message += '<br>- contraseña'
        }
        if (this.confirmPassword === '') {
          this.message += '<br>- confirmar contraseña'
        }
        console.log(this.error)
      } else if (this.confirmPassword === user.password) {
        UserService.registerNewAdmin(user).then(
          () => {
            this.successful = true
            this.message = 'El admin ha sido registrado correctamente'
          },
          (error) => {
            this.successful = false
            this.message = error.response.data.message
          }
        )
      } else {
        this.successful = false
        this.message = 'Las contraseñas no coinciden'
      }
      this.loading = false
    }
  },
  validations () {
    return {
      fullname: { required },
      email: { required },
      password: { required },
      confirmPassword: { required }
    }
  }
}
</script>
