import axios from "axios";
import { URL_LOGIN, URL_MATCHING_SVC, URL_DELETE_USER, URL_CHANGE_PASSWORD } from "common/configs";

export async function loginUser(username, password) {
  const body = { username, password };

  const response = await axios.post(URL_LOGIN, body);
  return response;
}

export async function deleteUser() {
  const body = {};

  const response = await axios.post(URL_DELETE_USER, body, {withCredentials: true});
  return response;
}

export async function changePassword(password) {
  const body = { password };

  const response = await axios.post(URL_CHANGE_PASSWORD, body, {withCredentials: true});
  return response;
}

export async function matchUser(username, difficulty) {
  const body = { username, difficulty };

  const response = await axios.post(URL_MATCHING_SVC, body);
  return response;
}

export async function deleteMatch(id) {
  const response = await axios.delete(URL_MATCHING_SVC + `/${id}`);
  return response;
}

