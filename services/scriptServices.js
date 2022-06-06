import axios from "axios";
import { APP_API_URL } from "../config";

export const scriptServices = {
  //   searchForScripts,
  //   createScript,
  //   deleteScript,
  getListOfScripts,
};

async function getListOfScripts() {
  return axios
    .get(`${APP_API_URL}/scripts`)
    .then(res => res)
    .catch(err => err);
}
