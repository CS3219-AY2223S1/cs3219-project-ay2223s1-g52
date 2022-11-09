import axios from "axios";
import {
  URL_LOGIN,
  URL_MATCHING_SVC,
  URL_DELETE_USER,
  URL_CHANGE_PASSWORD,
  URL_USER_SVC,
  URL_QUESTION_SVC,
  URL_HISTORY_SVC,
} from "common/configs";

export async function loginUser(username, password) {
  const body = { username, password };

  const response = await axios.post(URL_LOGIN, body);
  return response;
}

export async function deleteUser(cookies) {
  const body = {};

  const response = await axios.post(URL_DELETE_USER, body, {
    headers: {
      Authorization: "Bearer " + cookies["token"],
    },
  });
  return response;
}

export async function changePassword(cookies, password) {
  const body = { password };

  const response = await axios.post(URL_CHANGE_PASSWORD, body, {
    headers: {
      Authorization: "Bearer " + cookies["token"],
    },
  });
  return response;
}

export async function signUpUser(username, password) {
  const body = { username, password };

  const response = await axios.post(URL_USER_SVC, body);

  return response;
}

export async function matchUser(user, difficulty) {
  const body = { user, difficulty };

  const response = await axios.post(URL_MATCHING_SVC, body);
  return response;
}

export async function getQuestion(roomId) {
  const response = await axios.get(URL_QUESTION_SVC + `/random/${roomId}`);
  return response;
}

export async function getQuestionFromSlug(titleSlug) {
  const response = await axios.get(URL_QUESTION_SVC + `/${titleSlug}`);
  return response;
}

export async function getHistory(user) {
  const response = await axios.get(URL_HISTORY_SVC + `/${user}`);
  return response;
}

export async function setHistory(user, questionData) {
  const body = {
    title: questionData.title,
    titleSlug: questionData.titleSlug,
  };
  const response = await axios.post(URL_HISTORY_SVC + `/${user}`, body);
  return response;
}
