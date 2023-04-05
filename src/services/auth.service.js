import axios from 'axios';

const API_URL = 'https://svc-users-taller2-fiufit-svc-users-pr-1.cloud.okteto.net';

class AuthService {
  async login(user) {
    if (this.store.getters.isLoggedIn) {
      await this.login({
        email: "admin@kinetix.com",
        password: "admin"
      })
    }

    return axios
      .post(`${API_URL}/tokens`, {
        email: user.email,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('token', response.data.accessToken);
          this.store.dispatch('token', response.data.accessToken);
          // this.$store.dispatch('user', response.data.user);
          // localStorage.setItem('user', JSON.stringify(response.data));
        }

        // falta desencodear token y guardar usuario

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('token');
  }

  async register(user) {
    if (this.store.getters.isLoggedIn) {
      await this.login({
        email: "admin@kinetix.com",
        password: "admin"
      })
    }

    return axios.post(`${API_URL}/admin`, {
      fullname: user.fullname,
      email: user.email,
      password: user.password
    });
  }
}

export default new AuthService();