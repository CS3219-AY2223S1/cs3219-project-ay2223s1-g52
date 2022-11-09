import { useState } from "react";

const useNotification = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [timeout, setTimeout] = useState(0);
  const [type, setType] = useState("success");

  const handleOpenNotification = async (message, timeout, type) => {
    setMessage(message);
    setTimeout(timeout);
    setType(type);
    setOpen(true);
  };

  const handleCloseNotification = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return {
    handleOpenNotification,
    snackbarProps: {
      open,
      autoHideDuration: timeout,
      onClose: handleCloseNotification,
    },
    alertProps: {
      severity: type,
      onClose: handleCloseNotification,
    },
    message,
  };
};

export default useNotification;
