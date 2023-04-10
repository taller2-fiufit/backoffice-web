import axios from 'axios';

const API_URL = 'https://svc-users-taller2-fiufit-svc-users-pr-4.cloud.okteto.net/';

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
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
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