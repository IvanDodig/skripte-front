import axios from "axios";
import { APP_API_URL } from "../config";

export const userScriptsServices = {
  //   searchForScripts,
  getListOfScripts,
};

async function getListOfScripts(userId) {
  return axios
    .get(`${APP_API_URL}/users/${userId}/scripts`)
    .then(res => res)
    .catch(err => err);
}
