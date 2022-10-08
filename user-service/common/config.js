export const URI_FRONTEND = process.env.URI_FRONTEND || "http://localhost:3000";
export const URI_USER_SVC = process.env.URI_USER_SVC || "http://localhost:8000";

export const PREFIX_USER_SVC = "/api/user";
export const PREFIX_LOGIN = "/login";
export const PREFIX_DELETE = "/delete-user";
export const PREFIX_CHANGE_PASSWORD = "/change-password";

export const URL_USER_SVC = URI_USER_SVC + PREFIX_USER_SVC;
export const URL_LOGIN = URL_USER_SVC + PREFIX_LOGIN;
export const URL_DELETE_USER = URL_USER_SVC + PREFIX_DELETE;
export const URL_CHANGE_PASSWORD = URL_USER_SVC + PREFIX_CHANGE_PASSWORD;