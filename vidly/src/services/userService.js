import http from "./httpService";
// import config from "../config.json";

function userUrl() {
  return `users`;
}

function register(user) {
  return http.post(userUrl(), {
    email: user.username,
    password: user.password,
    name: user.name
  });
}

export default {
  register
};