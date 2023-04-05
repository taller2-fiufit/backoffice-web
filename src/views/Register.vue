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

            <!--
            <v-text-field
              v-model="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              placeholder="confirm password"
              required
            ></v-text-field>
            --->

            <v-btn type="submit" color="#9ACD32" block class="mt-2" :disabled="loading">
              <span
                v-show="loading"
                class="spinner-border spinner-border-sm"
              ></span>
              <span>Sign Up</span>
            </v-btn> 
          </div>
          <!--
          <div>
            <Error v-if="error" :error="error" />
          </div>
          -->

        </v-form>

        <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
        >
        {{ message }}
      </div>
      </v-sheet>
  </div>
</template>

<script>
  // import axios from 'axios'

  // import Error from '../components/Error.vue'

  export default {
    name: "Register",
    // components: {
    //   Error
    // },
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
    computed: {
      loggedIn() {
        return this.$store.state.auth.status.loggedIn;
      },
    },
    mounted() {
      if (this.loggedIn) {
        this.$router.push("/dashboard");
      }
    },
    methods: {
      // async handleRegister() {
      //   try {
      //     const newUser = {
      //     fullname: this.fullname,
      //     email: this.email,
      //     password: this.password,
      //     confirmPassword: this.confirmPassword
      //     };
// 
      //     await axios.post('register', newUser);
      //     // if response is successfull user is redirected to login route
      //     this.$router.push('/login');
      //     this.error = '';
      //   } catch(error) {
      //     this.error = error;
      //   }
      // }
      handleRegister(user) {
        this.message = "";
        this.successful = false;
        this.loading = true;
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
          }
        );
      }
    }
  }
</script>