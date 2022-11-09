import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Notification from "components/Notification";
import QuestionEditorPanel from "components/QuestionEditorPanel";

import useNotification from "hooks/useNotification";
import { styles } from "./styles";
import { getNewLines } from "common/utils";
import useQuestion from "hooks/useQuestion";

const DEFAULT_NO_OF_LINES = getNewLines(20);

const DEFAULT_EDITOR_VALUE =
  "# This is a room for you to re-attempt questions on you own. Enter code here:" +
  DEFAULT_NO_OF_LINES;

const SoloRoomPage = () => {
  const { handleOpenNotification, snackbarProps, alertProps, message } =
    useNotification();
  const roomType = "solo";
  const { questionObject, questionName } = useQuestion(
    handleOpenNotification,
    roomType,
  );

  return (
    <Box sx={styles.mainContainer}>
      <QuestionEditorPanel
        isCollabEditor={false}
        editorProps={{ value: DEFAULT_EDITOR_VALUE }}
        handleOpenNotification={handleOpenNotification}
        type={roomType}
        questionObject={questionObject}
        questionName={questionName}
      />
      <Box sx={styles.bottomActionHolder}>
        <Button variant="contained" sx={styles.returnButton} href="/history">
          Return to History
        </Button>
      </Box>
      <Notification
        snackbarProps={snackbarProps}
        alertProps={alertProps}
        message={message}
      />
    </Box>
  );
};

export default SoloRoomPage;
