import axios from "axios";
import { APP_API_URL } from "../config";

export const scriptReviewServices = {
  //   searchForScripts,
  createScriptReview,
  //   deleteScript,
  getListOfScriptReviews,
};

async function createScriptReview({
  description,
  rating,
  reviewer_id,
  script_id,
}) {
  return axios
    .post(`${APP_API_URL}/scripts/${script_id}/reviews`, {
      description,
      rating,
      reviewer_id,
      script_id,
    })
    .then(res => res)
    .catch(err => err);
}

async function getListOfScriptReviews(id) {
  return axios
    .get(`${APP_API_URL}/scripts/${id}/reviews`)
    .then(res => res)
    .catch(err => err);
}
