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
        class="mb-6 pointer"
      ></v-img>
      
      <v-form fast-fail @submit.prevent="handleLogin">

        <div>
          <ErrorAlert v-if="error" :error="error" />
        </div>
  
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
        <!--
        <router-link to="forgot" class="text-body-2 font-weight-regular">¿Olvidaste tu contraseña?</router-link>  
        -->
        <br />

        <v-btn type="submit" color="#9ACD32" block class="mt-2" :disabled="loading">
          <span
            v-show="loading"
            class="spinner-border spinner-border-sm"
          ></span>
          <span>Iniciar sesion</span>
        </v-btn>
      </v-form>

      <!--<div class="mt-2">
          <p class="text-body-2">Don't have an account? <router-link to="/register">Sign Up</router-link></p>
      </div>-->
    </v-sheet>
  </div>
</template>

<script>
// import axios from 'axios'
import User from '../models/user';
import ErrorAlert from '../components/ErrorAlert.vue'
import useVuelidate from '@vuelidate/core';
import { required } from "@vuelidate/validators";

export default {
  name: "Login",
  components: {
    ErrorAlert
  },
  data() {
    return {
      v$: useVuelidate(),
      loading: false,
      email: '',
      password: '',
      error: ''
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/dashboard");
    }
  },
  methods: {
    handleLogin() {
      this.loading = true;
      let user = new User('', this.email, this.password);
      this.v$.$validate()
      if (this.v$.$error) {
        this.error = 'Falta completar los siguientes campos:';
        if (this.email == "") {
          this.error += "<br>- correo electrónico"
        }
        if (this.password == "") {
          this.error += "<br>- contraseña"
        }
      } else {
        this.$store.dispatch("auth/login", user).then(
          () => {
            this.$router.push("/dashboard");
          },
          (error) => {
            console.log(error.response.data.message);
            this.error = error.response.data.message;
          }
        );
      }
      this.loading = false;
    },
  },
  validations() {
    return {
      email: { required },
      password: { required },
    }
  }
}
</script>