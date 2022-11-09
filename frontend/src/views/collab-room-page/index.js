import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import RoomTimer from "components/RoomTimer";
import Notification from "components/Notification";
import Chat from "components/Chat";
import CollabChatButton from "components/CollabChatButton";
import QuestionEditorPanel from "components/QuestionEditorPanel";

import useNotification from "hooks/useNotification";
import useCollabEditor from "hooks/useCollabEditor";
import useChat from "hooks/useChat";
import { styles } from "./styles";
import useQuestion from "hooks/useQuestion";

const CollabRoomPage = () => {
  const { handleOpenNotification, snackbarProps, alertProps, message } =
    useNotification();

  const { editor, users, timer } = useCollabEditor(handleOpenNotification);
  const roomType = "collab";

  const { questionObject, questionName, handleEndSession } = useQuestion(
    handleOpenNotification,
    roomType,
  );

  const {
    isChatOpen,
    messages,
    noOfNewMessages,
    handleClickChat,
    currMessage,
    handleSendMessage,
    handleEnterSendMessage,
    handleOnType,
  } = useChat(handleOpenNotification);
  return (
    // <Box sx={styles.mainContainer}>
    <Box sx={styles.itemContainer}>
      <Box sx={styles.timerHolder}>
        <RoomTimer timeInMs={timer} />
      </Box>
      <QuestionEditorPanel
        editor={editor}
        users={users}
        handleOpenNotification={handleOpenNotification}
        type={roomType}
        questionObject={questionObject}
        questionName={questionName}
      />
      <Box sx={styles.bottomActionBackground}>
        <Box sx={styles.bottomActionHolder}>
          <Chat
            isChatOpen={isChatOpen}
            messages={messages}
            currMessage={currMessage}
            handleSendMessage={handleSendMessage}
            handleEnterSendMessage={handleEnterSendMessage}
            handleOnType={handleOnType}
          />
          <CollabChatButton
            handleClickChat={handleClickChat}
            noOfNewMessages={noOfNewMessages}
          />
          <Button
            variant="contained"
            sx={styles.endSessionButton}
            href="/endOfSession"
            onClick={handleEndSession}
          >
            End session
          </Button>
        </Box>
      </Box>
      <Notification
        snackbarProps={snackbarProps}
        alertProps={alertProps}
        message={message}
      />
    </Box>
    // </Box>
  );
};

export default CollabRoomPage;
