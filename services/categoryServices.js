import axios from "axios";
import { APP_API_URL } from "../config";

export const categoryServices = {
  //   searchForScripts,
  //   createScript,
  //   deleteScript,
  getListOfCategories,
  createCategory,
  deleteCategory,
};

async function getListOfCategories() {
  return axios
    .get(`${APP_API_URL}/categories`)
    .then(res => res)
    .catch(err => err);
}

async function createCategory({ name }) {
  return axios
    .post(`${APP_API_URL}/categories`, { name })
    .then(res => res)
    .catch(err => err);
}

async function deleteCategory(id) {
  return axios
    .delete(`${APP_API_URL}/categories/${id}`)
    .then(res => res)
    .catch(err => err);
}
