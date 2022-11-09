import { getQuestion, getQuestionFromSlug, setHistory } from "api";
import { isCollabType } from "common/utils";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useLocation } from "react-router-dom";

const useQuestion = (handleOpenNotification, type) => {
  // Feel free to update this to useState
  const [questionObject, setQuestionObject] = useState("Loading question...");

  const [questionName, setQuestionName] = useState("");

  const [questionTitleSlug, setQuestionTitleSlug] = useState("");

  const search = useLocation().search;

  let promiseQuestionObject = null;
  if (isCollabType(type)) {
    const roomId = new URLSearchParams(search).get("roomId");
    promiseQuestionObject = getQuestion(roomId);
  } else {
    const titleSlug = new URLSearchParams(search).get("titleSlug");
    promiseQuestionObject = getQuestionFromSlug(titleSlug);
  }
  promiseQuestionObject
    .then((res) => {
      const { content, title, titleSlug } = res.data;
      setQuestionName(title);
      setQuestionObject(content);
      setQuestionTitleSlug(titleSlug);
    })
    .catch((error) => {
      handleOpenNotification("Failed to fetch question!", 3000, "error");
    });

  const [cookies] = useCookies(["token"]);
  const handleEndSession = () => {
    console.log("end session button clicked");
    setHistory(cookies?.username || "", {
      title: questionName,
      titleSlug: questionTitleSlug,
    }).then((res) => {
      console.log(res.data);
    });
  };

  // TODO: Add logic to get question from backend and return question info

  // Note: Can use handleOpenNotification to notify user in small popup if theres issues getting question from backend
  // handleOpenNotification(message, timeoutTime, type)
  // - message: Message to show user
  // - timeoutTime: time popup takes to exit in ms
  // - type: type of notification ("success" || "error")
  // Example usage: handleOpenNotification("Encounter issues retriveing questions!", 4000, "error")

  return { questionObject, questionName, handleEndSession };
};

export default useQuestion;
