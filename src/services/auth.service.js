import axios from 'axios';

import authHeader from './auth-header';

const API_URL = 'https://svc-users-fedecolangelo.cloud.okteto.net/';

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
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }
}

export default new AuthService();