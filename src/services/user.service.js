import axios from 'axios';
import authHeader from './auth-header';
import VueJwtDecode from 'vue-jwt-decode';

const API_URL=process.env.VUE_APP_USERS_API_URL;

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

  getUserCount() {
    return axios.get(API_URL + 'users/count')
  }

  getFollowingListById(userId) {
    return axios.get(API_URL + 'users/' + userId + '/following', { headers: authHeader() });
  }

  getFollowersListById(userId) {
    return axios.get(API_URL + 'users/' + userId + '/followers', { headers: authHeader() });
  }

  blockUser(userId) {
    return axios.patch(API_URL + 'users/' + userId + '/status', 
    { blocked: true },
    { headers: authHeader() });
  }

  unblockUser(userId) {
    return axios.patch(API_URL + 'users/' + userId + '/status', 
    { blocked: false },
    { headers: authHeader() });
  }  
}

export default new UserService();
