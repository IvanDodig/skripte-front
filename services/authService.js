import axios from "axios";
import { APP_API_URL } from "../config";
export const authService = {
  register,
  login,
  logout,
};

async function register({ name, email, password, password_confirmation }) {
  return axios
    .post(`${APP_API_URL}/create-account`, {
      name,
      email,
      password,
      password_confirmation,
    })
    .then(res => res)
    .catch(err => err);
}

async function login({ email, password }) {
  return axios
    .post(`${APP_API_URL}/signin`, { email, password })
    .then(res => {
      console.log(res);
      return res;
    })
    .catch(err => err);
}

async function logout({}) {
  return axios
    .post(`${APP_API_URL}/sign-out`, {})
    .then(res => res)
    .catch(err => err);
}
