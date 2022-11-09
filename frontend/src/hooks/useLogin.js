import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "api/index";
import { useCookies } from "react-cookie";
import { TOKEN_AGE } from "../common/configs";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [isInvalidLogin, setIsInvalidLogin] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const handleLoginSuccess = (username, token) => {
    setCookie("token", token, { path: "/", maxAge: TOKEN_AGE });
    setCookie("username", username, { path: "/", maxAge: TOKEN_AGE });

    navigate("/", { replace: true });
    setLoading(false);
  };

  const handleLogin = async (event) => {
    setLoading(true);
    setIsInvalidLogin(false);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    await loginUser(data.get("username"), data.get("password"))
      .then((res) => {
        const { username, token } = res.data;
        handleLoginSuccess(username, token);
      })
      .catch((error) => {
        setIsInvalidLogin(true);
        console.error(error);
        setLoading(false);
      });
  };

  return {
    handleLogin,
    loading,
    isInvalidLogin,
  };
};

export default useLogin;
