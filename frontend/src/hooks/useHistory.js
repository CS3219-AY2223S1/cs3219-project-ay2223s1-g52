import { getHistory } from "api";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const useHistory = () => {
  const [pastQuestions, setPastQuestions] = useState([]);
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();
  const handleQuestionClick = (titleSlug) => {
    // TODO: navigate to the solo page
    navigate(`/soloRoom?titleSlug=${titleSlug}`);
  };

  useEffect(() => {
    getHistory(cookies?.username || "")
      .then((res) => {
        const questionDatas = res.data.map((data) => {
          return {
            title: data.title,
            titleSlug: data.titleSlug,
            createdAt: new Date(data.createdAt),
          };
        });

        questionDatas.sort((a, b) => b.createdAt - a.createdAt);

        setPastQuestions(questionDatas);
      })
      .catch((err) =>
        console.log("Something went wrong when getting history", err),
      );
  }, [cookies?.username]);

  return {
    handleQuestionClick,
    pastQuestions,
  };
};

export default useHistory;
