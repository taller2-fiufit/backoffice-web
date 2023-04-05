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
      
      <v-form fast-fail @submit.prevent="handleLogin">

        <div>
          <Error v-if="error" :error="error" />
        </div>
  
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
        
        <router-link to="forgot" class="text-body-2 font-weight-regular">Forgot Password?</router-link>  

        <br />

        <v-btn @click="submitLogin" type="submit" color="#9ACD32" block class="mt-2" :disabled="loading">
          <span
            v-show="loading"
            class="spinner-border spinner-border-sm"
          ></span>
          <span>Login</span>
        </v-btn>
        
        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">
            {{ message }}
          </div>
        </div>
      </v-form>

      <div class="mt-2">
          <p class="text-body-2">Don't have an account? <router-link to="/register">Sign Up</router-link></p>
      </div>
    </v-sheet>
  </div>
</template>

<script>

// import axios from 'axios'
import useValidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

// import Error from '../components/Error.vue'

export default {
  name: "Login",
  // components: {
  //   Error
  // },
  data() {
    return {
      v$: useValidate(),
      loading: false,
      message: "",
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
    submitLogin() {
      this.v$.$validate() // checks all inputs
      if (!this.v$.$error) {
        // if ANY fail validation
        alert('Form successfully submitted.')
      } else {
        alert('Form failed validation')
      }
    },
    handleLogin(user) {
      this.loading = true;
      this.$store.dispatch("auth/login", user).then(
        () => {
          this.$router.push("/dashboard");
        },
        (error) => {
          this.loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    }
    // async handleLogin() {
    //   try {
    //     const user = {
    //     email: this.email,
    //     password: this.password
    //     }
    //     const response = await axios.post('login', user);
    //     localStorage.setItem('token', response.data.token);
    //     this.$store.dispatch('user', response.data.user);
    //     this.$router.push('/');
    //     this.error = '';
    //   } catch (error) {
    //     this.error = error;
    //   }
    // }
  },
  validations() {
    return {
      email: { required },
      password: { required }
    }
  }
}
</script>