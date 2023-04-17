import axios from 'axios';
import authHeader from './auth-header';
import VueJwtDecode from 'vue-jwt-decode';

const API_URL=process.env.VUE_APP_API_URL;

class UserService {
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

  getCurrentUserInfo() {
    let user = JSON.parse(localStorage.getItem('user'));
    let userId = VueJwtDecode.decode(user.access_token).sub;
    return axios.get(API_URL + 'users/' + userId);
  }

  getUserInfoById(userId) {
    return axios.get(API_URL + 'users/' + userId);
  }
}

export default new UserService();
