<!--
<template>
  <v-app-bar color="green" class="flex-grow-0" app dark>
      <v-app-bar-title>Registro</v-app-bar-title>
  </v-app-bar>
</template>
-->

<template>
  <div class="d-flex align-center justify-center" style="height: 100vh">
      <v-sheet width="400" class="mx-auto">
        <v-img
          max-height="200"
          :src="require('@/assets/login-logo.png')"
          alt="kinetix logo"
          class="ml-2 pointer"
        ></v-img>

        <v-img
          max-height="70"
          :src="require('@/assets/login-name.png')"
          alt="kinetix name"
          class="ml-2 pointer"
        ></v-img>

        <v-form fast-fail @submit.prevent="handleRegister">
          
          <div>
            <ErrorAlert v-if="error" :error="error" />
          </div>

          <div>
            <SucessAlert v-if="message" :message="message" />
          </div>

          <div v-if="!successful">
            <v-text-field
              v-model="fullname"
              name="fullname"
              label="Full Name"
              type="text"
              placeholder="fullname"
              required
            ></v-text-field>

            <v-text-field
              v-model="email"
              name="email"
              label="Email"
              type="email"
              placeholder="email"
              required
            ></v-text-field>
          
            <v-text-field
              v-model="password"
              name="password"
              label="Password"
              type="password"
              placeholder="password"
              required
            ></v-text-field>

            <v-text-field
              v-model="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              placeholder="confirm password"
              required
            ></v-text-field>

            <v-btn type="submit" color="#9ACD32" block class="mt-2" :disabled="loading">
              <span
                v-show="loading"
                class="spinner-border spinner-border-sm"
              ></span>
              <span>Sign Up</span>
            </v-btn> 
          </div>
        </v-form>
      </v-sheet>
  </div>
</template>


<script>
  // import axios from 'axios'

  import ErrorAlert from '../components/ErrorAlert.vue'
  import SuccessAlert from '../components/SuccessAlert.vue'

  export default {
    name: "Register",
    components: {
      ErrorAlert,
      SuccessAlert
    },
    data() {
      return {
        successful: false,
        loading: false,
        message: "",
        // v-model
        fullname: '',
        email: '',
        password: '',
        // confirmPassword: '',
        // error: ''
      }
    },
    methods: {
      handleRegister(user) {
        // CHEQUEAR SI PASSWORD Y CONFIRM PASSWORD SON IGUALES
        this.message = "";
        this.error = "";
        this.successful = false;
        this.loading = true;
        console.log(user);
        this.$store.dispatch("auth/register", user).then(
          (data) => {
            this.message = data.message;
            this.successful = true;
            this.loading = false;
          },
          (error) => {
            this.message =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
            this.successful = false;
            this.loading = false;
            this.error = error.response.data.message;
          }
        );
      }
    }
  }
</script>
