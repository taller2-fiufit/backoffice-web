export default function authHeader() {
    // let user = JSON.parse(localStorage.getItem('user'));
  
    let token = localStorage.getItem('token');
    // if (user && user.accessToken) {
    if (token) {
      return { Authorization: 'Bearer ' + token }; // for Spring Boot back-end
      // return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
    } else {
      return {};
    }
  }