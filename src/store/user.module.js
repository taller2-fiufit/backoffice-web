import UserService from '../services/user.service';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const userModule = {
  namespaced: true,
  state: initialState,
  actions: {
    getUserFullname({ commit }, userId) {
      return UserService.getUserFullname(userId).then(
        response => {
          return Promise.resolve(response.data.fullname);
        },
        error => {
          return Promise.reject(error);
        }
      );
    }
  }
};