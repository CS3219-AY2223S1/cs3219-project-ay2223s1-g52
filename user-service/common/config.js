export const URI_FRONTEND = process.env.ENV === "PROD" ? process.env.URI_FRONTEND : "http://localhost:3000";
export const URI_USER_SVC = process.env.ENV === "PROD" ? process.env.URI_USER_SVC : "http://localhost:8000";

export const PREFIX_USER_SVC = "/api/user";
export const PREFIX_LOGIN = "/login";
export const PREFIX_DELETE = "/delete-user";
export const PREFIX_CHANGE_PASSWORD = "/change-password";
// TODO: the below is not used anywhere, should delete them
export const API_LOGIN = PREFIX_USER_SVC + PREFIX_LOGIN;
export const API_DELETE_USER = PREFIX_USER_SVC + PREFIX_DELETE;
export const API_CHANGE_PASSWORD = PREFIX_USER_SVC + PREFIX_CHANGE_PASSWORD;

export const URL_USER_SVC = URI_USER_SVC + PREFIX_USER_SVC;
