import axios from 'axios';

import authHeader from './auth-header';

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
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    console.log(authHeader());
    console.log(user);
    return axios.post(API_URL + 'admin', {
      fullname: user.fullname,
      email: user.email,
      password: user.password
    },
    { headers: authHeader() }
    );
  }
}

export default new AuthService();