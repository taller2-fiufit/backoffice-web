<template>
  <v-app-bar color="#9ACD32" class="flex-grow-0" app dark>
    <v-app-bar-title>Registro</v-app-bar-title>
  </v-app-bar>
  
  <div class="d-flex align-center justify-center" style="height: 75vh">
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

        <br>

        <v-form fast-fail @submit.prevent="handleRegister">
          
          <div>
            <ErrorAlert v-if="successful == false" :error="message" />
          </div>

          <div>
            <SuccessAlert v-if="successful" :message="message" />
          </div>

          <div>
            <v-text-field
              v-model="user.fullname"
              name="fullname"
              label="Full Name"
              type="text"
              placeholder="fullname"
              required
            ></v-text-field>

            <v-text-field
              v-model="user.email"
              name="email"
              label="Email"
              type="email"
              placeholder="email"
              required
            ></v-text-field>
          
            <v-text-field
              v-model="user.password"
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

            <br>

            <v-btn type="submit" color="#9ACD32" block class="mt-2">
              <span
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
  import User from '../models/user';
  import ErrorAlert from '../components/ErrorAlert.vue'
  import SuccessAlert from '../components/SuccessAlert.vue'
  import UserService from '../services/user.service';
  export default {
    name: "Register",
    components: {
      ErrorAlert,
      SuccessAlert
    },
    data() {
      return {
        successful: null,
        message: "",
        user: new User('', ''),
        confirmPassword: '',
      }
    },
    methods: {
      handleRegister() {
        if (this.confirmPassword == this.user.password) {
          UserService.registerNewAdmin(this.user).then(
            (_) => {
              this.successful = true;
              this.message = "User registered successfully";
      
            },
            (error) => {
              /*this.message =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();*/
              this.successful = false;
              this.loading = false;
              this.message = error.response.data.message;
            }
          );
        } else {
          this.successful = false;
          this.message = 'Passwords do not match'
        }
      }
    }
  }
</script>
