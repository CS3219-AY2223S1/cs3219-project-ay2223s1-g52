import { useState } from "react";
import { signUpUser } from "api/index";
import { STATUS_CODE_CREATED, STATUS_CODE_BAD_REQUEST } from "common/constants";

const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const [isSignupFailure, setIsSignupFailure] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSignupSuccess, setIsSignupSuccess] = useState(false);

  const handleSignUpSuccess = (user, password) => {
    console.log("Signed Up!");
    console.log(`User: ${user}, Password: ${password}`);
    setIsSignupSuccess(true);
    setLoading(false);
  };

  const handleSignUp = async (event) => {
    setLoading(true);
    setIsSignupFailure(false);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    await signUpUser(data.get("username"), data.get("password"))
      .then((response) => {
        if (response.status === STATUS_CODE_CREATED) {
          handleSignUpSuccess(data.get("username"), data.get("password"));
        }
      })
      .catch((error) => {
        if (error.response.status === STATUS_CODE_BAD_REQUEST) {
          console.error(error);
          setIsSignupFailure(true);
          setErrorMessage(error.response.data.message);
          setLoading(false);
        } else {
          console.error(error);
          console.log("Check whether user service is running");
          setIsSignupFailure(true);
          setErrorMessage("Encountered issues connecting to the server");
          setLoading(false);
        }
      });
  };

  return {
    handleSignUp,
    loading,
    isSignupFailure,
    errorMessage,
    isSignupSuccess,
  };
};

export default useSignUp;
