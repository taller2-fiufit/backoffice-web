import AuthService from './auth.service';

export default function authHeader() {
  AuthService.renewToken();
  let user = JSON.parse(localStorage.getItem('user'));

  if (user && user.access_token) {
    return { Authorization: 'Bearer ' + user.access_token };
  } else {
    return {};
  }
}
