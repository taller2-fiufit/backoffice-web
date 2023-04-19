import axios from 'axios';
import VueJwtDecode from 'vue-jwt-decode';

const API_URL=process.env.VUE_APP_USERS_API_URL;

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
          console.log(response.data.access_token)
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