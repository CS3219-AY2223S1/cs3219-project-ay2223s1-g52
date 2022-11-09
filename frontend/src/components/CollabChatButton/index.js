import React from "react";
import Fab from "@mui/material/Fab";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import Badge from "@mui/material/Badge";
import { styles } from "./styles";

const CollabChatButton = ({ handleClickChat, noOfNewMessages }) => {
  return (
    <Fab
      sx={styles.fab}
      aria-label="chat-button"
      color="primary.dark"
      onClick={handleClickChat}
    >
      <Badge badgeContent={noOfNewMessages} color="error">
        <ChatBubbleIcon sx={styles.chatIcon} />
      </Badge>
    </Fab>
  );
};

export default CollabChatButton;
