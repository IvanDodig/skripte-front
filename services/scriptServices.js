import axios from "axios";
import { APP_API_URL } from "../config";
import FormData from "form-data";

export const scriptServices = {
  //   searchForScripts,
  createScript,
  deleteScript,
  updateScript,
  getListOfScripts,
  getScriptById,
};

async function getListOfScripts() {
  return axios
    .get(`${APP_API_URL}/scripts`)
    .then(res => res)
    .catch(err => err);
}

async function createScript({
  title,
  description,
  creator_id,
  category_id,
  script,
}) {
  const formData = new FormData();
  formData.append("script", script[0].blobFile);
  formData.append("title", title);
  formData.append("description", description);
  formData.append("creator_id", creator_id);
  formData.append("category_id", category_id);

  return axios
    .post(`${APP_API_URL}/scripts`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(res => res)
    .catch(err => err);
}

async function getScriptById(id) {
  return axios
    .get(`${APP_API_URL}/scripts/${id}`)
    .then(res => res)
    .catch(err => err);
}

async function updateScript(id, data) {
  return axios
    .patch(`${APP_API_URL}/scripts/${id}`, data)
    .then(res => res)
    .catch(err => err);
}

async function deleteScript(id) {
  return axios
    .delete(`${APP_API_URL}/scripts/${id}`)
    .then(res => res)
    .catch(err => err);
}
