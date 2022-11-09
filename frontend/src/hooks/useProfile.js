import { useState } from "react";
import { deleteUser, changePassword } from "api/index";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { STATUS_CODE_BAD_REQUEST, STATUS_CODE_SUCCESS } from "common/constants";

const useProfile = () => {
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [isInvalidAction, setIsInvalidAction] = useState(false);
  const [isSuccessAction, setIsSuccessAction] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isDelete, setIsDelete] = useState(false);

  const navigate = useNavigate();

  const handleClickDelete = (event) => {
    setIsDelete(true);
  };
  const handleClickClose = (event) => {
    setIsDelete(false);
  };

  const handleDeleteUser = async (event) => {
    await deleteUser(cookies)
      .then((res) => {
        if (res.status === STATUS_CODE_SUCCESS) {
          removeCookie("token");
          navigate("/login");
        }
      })
      .catch((error) => {
        setIsInvalidAction(true);
        setIsSuccessAction(false);
        console.log(error);
        if (error.response.status === STATUS_CODE_BAD_REQUEST) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage("Encountered issues connecting to the server");
        }
      });
  };

  const handleChangePassword = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    await changePassword(cookies, data.get("password"))
      .then((res) => {
        if (res.status === STATUS_CODE_SUCCESS) {
          setIsSuccessAction(true);
          setIsInvalidAction(false);
          setSuccessMessage(res.data.message);
        }
      })
      .catch((error) => {
        setIsInvalidAction(true);
        setIsSuccessAction(false);
        console.log(error);
        if (error.response.status === STATUS_CODE_BAD_REQUEST) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage("Encountered issues connecting to the server");
        }
      });
  };

  return {
    handleDeleteUser,
    handleChangePassword,
    isInvalidAction,
    isSuccessAction,
    errorMessage,
    successMessage,
    isDelete,
    handleClickDelete,
    handleClickClose,
  };
};

export default useProfile;
