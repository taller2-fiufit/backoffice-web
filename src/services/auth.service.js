import axios from 'axios';
import VueJwtDecode from 'vue-jwt-decode';

const API_URL = 'https://svc-users-fedecolangelo.cloud.okteto.net/';

class AuthService {
  login(user) {
    console.log(user.email);
    console.log(user.password);
    return axios
      .post(API_URL + 'tokens', {
        email: user.email,
        password: user.password
      })
      .then(response => {
        if (response.data.access_token) {
          let decoded = VueJwtDecode.decode(response.data.access_token);
          console.log(decoded);
          localStorage.setItem('user', JSON.stringify(decoded));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password
    });
  }
}

export default new AuthService();