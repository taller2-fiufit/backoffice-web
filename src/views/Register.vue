<template>
  <v-app-bar color="#9ACD32" class="flex-grow-0" app dark>
    <v-app-bar-title>Registro</v-app-bar-title>
  </v-app-bar>
  
  <div class="d-flex align-center justify-center" style="height: 75vh">
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

            <br>

            <v-btn type="submit" color="#9ACD32" block class="mt-2">
              <span
                class="spinner-border spinner-border-sm"
              ></span>
              <span>Registrar administrador</span>
            </v-btn> 
          </div>
        </v-form>
      </v-sheet>
  </div>
</template>


<script>
  import User from '../models/user';
  import ErrorAlert from '../components/ErrorAlert.vue'
  import SuccessAlert from '../components/SuccessAlert.vue'
  import UserService from '../services/user.service';
  import useVuelidate from '@vuelidate/core';
  import { required } from "@vuelidate/validators";

  export default {
    name: "Register",
    components: {
      ErrorAlert,
      SuccessAlert
    },
    data() {
      return {
        v$: useVuelidate(),
        successful: null,
        message: "",
        fullname: "",
        password: "",
        email: "",
        confirmPassword: '',
      }
    },
    methods: {
      handleRegister() {
        this.loading = true;
        let user = new User(this.fullname, this.email, this.password);
        this.v$.$validate()
        if (this.v$.$error) {
          this.successful = false;
          this.message = 'Los datos ingresados no son válidos';
        } else if (this.confirmPassword == user.password) {
          UserService.registerNewAdmin(user).then(
            (_) => {
              this.successful = true;
              this.message = "El admin ha sido registrado correctamente";
            },
            (error) => {
              this.successful = false;
              this.message = error.response.data.message;
            }
          );
        } else {
          this.successful = false;
          this.message = 'Las contraseñas no coinciden'
        }
        this.loading = false;
      },
    },
    validations() {
      return {
        fullname: { required },
        email: { required },
        password: { required },
        confirmPassword: { required }
      }
  }
  }
</script>
