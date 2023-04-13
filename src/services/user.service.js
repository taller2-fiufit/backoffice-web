import axios from 'axios';
import authHeader from './auth-header';
import VueJwtDecode from 'vue-jwt-decode';

const API_URL = 'https://svc-users-fedecolangelo.cloud.okteto.net/';

class UserService {
  /*
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
  */

  registerNewAdmin(user) {
    return axios.post(API_URL + 'admin/', {
      fullname: user.fullname,
      email: user.email,
      password: user.password
    },
    { headers: authHeader() }
    );
  }

  getUserList() {
    return axios.get(API_URL + 'users/', { headers: authHeader() });
  }

  getUserInfo() {
    let user = JSON.parse(localStorage.getItem('user'));
    let userId = VueJwtDecode.decode(user.access_token).sub;
    return axios.get(API_URL + 'users/' + userId);
 }
}

export default new UserService();