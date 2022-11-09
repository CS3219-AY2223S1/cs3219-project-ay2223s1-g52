//TODO: frontend env not working
const ENV = process.env.REACT_APP_ENV ?? "PROD";
const URI_USER_SVC =
  ENV === "PROD"
    ? "https://user-service-rob2padjya-de.a.run.app"
    : "http://localhost:8000";

const PREFIX_USER_SVC = "/api/user";
const PREFIX_LOGIN = "/login";
const PREFIX_DELETE = "/delete-user";
const PREFIX_CHANGE_PASSWORD = "/change-password";

export const URL_USER_SVC = URI_USER_SVC + PREFIX_USER_SVC;
export const URL_LOGIN = URL_USER_SVC + PREFIX_LOGIN;
export const URL_DELETE_USER = URL_USER_SVC + PREFIX_DELETE;
export const URL_CHANGE_PASSWORD = URL_USER_SVC + PREFIX_CHANGE_PASSWORD;

export const URI_MATCHING_SVC =
  ENV === "PROD"
    ? "https://matching-service-rob2padjya-de.a.run.app"
    : "http://localhost:8001";

const PREFIX_MATCH_SVC = "/api/matchService/match";

export const URL_MATCHING_SVC = URI_MATCHING_SVC + PREFIX_MATCH_SVC;

export const URI_COLLAB_SVC =
  ENV === "PROD"
    ? "https://collaboration-service-rob2padjya-de.a.run.app"
    : "http://localhost:8002";
export const TOKEN_AGE = process.env.REACT_APP_TOKEN_AGE || 259200;

export const URI_QUESTION_SVC =
  ENV === "PROD"
    ? "https://question-service-rob2padjya-de.a.run.app"
    : "http://localhost:8003";

const PREFIX_QUESTION_SVC = "/api/questionService/question";

export const URL_QUESTION_SVC = URI_QUESTION_SVC + PREFIX_QUESTION_SVC;

export const URI_COMMUNICATION_SVC =
  ENV === "PROD"
    ? "https://communication-service-rob2padjya-de.a.run.app"
    : "http://localhost:8004";

export const URI_HISTORY_SVC =
  ENV === "PROD"
    ? "https://history-service-rob2padjya-de.a.run.app"
    : "http://localhost:8005";

const PREFIX_HISTORY_SVC = "/api/historyService/history";

export const URL_HISTORY_SVC = URI_HISTORY_SVC + PREFIX_HISTORY_SVC;
