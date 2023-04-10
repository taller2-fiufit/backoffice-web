import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://svc-users-fedecolangelo.cloud.okteto.net';
;

class UserService {
  /*
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
  */
  getUserFullname(userId) {
    return axios.get(API_URL + '/users/' + userId);
 }
}

export default new UserService();