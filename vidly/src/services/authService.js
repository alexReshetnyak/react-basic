import http from "./httpService";
import config from "../config.json";
import jwtDecode from "jwt-decode";

const apiUrl = `${config.apiEndpoint}auth`;
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(email, password) {
  const {
    data: jwt
  } = await http.post(apiUrl, {
    email,
    password
  });
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

function logout() {
  localStorage.removeItem(tokenKey);
}

function getCurrentUser(params) {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  logout,
  login,
  getCurrentUser,
  loginWithJwt,
  getJwt
};