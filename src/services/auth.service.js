import axios from 'axios';
const API_URL = 'https://svc-users-fedecolangelo.cloud.okteto.net/';
import VueJwtDecode from 'vue-jwt-decode';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'tokens', {
        email: user.email,
        password: user.password
      })
      .then(response => {
        if (response.data.access_token) {
          localStorage.setItem('user', JSON.stringify(response.data));
          localStorage.setItem('user_data', JSON.stringify(user));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('user_data');
  }

  renewToken() {
    let token = JSON.parse(localStorage.getItem('user')).access_token;
    let exp = VueJwtDecode.decode(token).exp;
    if (Date.now() >= exp * 1000) {
      let user = JSON.parse(localStorage.getItem('user_data'));
      axios
        .post(API_URL + 'tokens', {
        email: user.email,
        password: user.password
        })
        .then(response => {
          if (response.data.access_token) {
            localStorage.setItem('user', JSON.stringify(response.data));
          }
        });
    }
  }
}


export default new AuthService();