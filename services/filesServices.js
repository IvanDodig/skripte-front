import axios from "axios";
import { APP_API_URL } from "../config";

export const filesServices = {
  downloadFile,
};

async function downloadFile(id) {
  return axios
    .get(`${APP_API_URL}/files/${id}`, {
      responseType: "arraybuffer", // important
    })
    .then(res => res)
    .catch(err => err);
}
