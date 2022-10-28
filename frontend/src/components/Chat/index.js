import React from "react";
import Box from "@mui/material/Box";
import Grow from "@mui/material/Grow";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SendIcon from "@mui/icons-material/Send";
import ButtonBase from "@mui/material/ButtonBase";

import TextMessage from "./TextMessage";

import { styles } from "./styles";

const Chat = ({ isChatOpen, messages, handleOnType, handleSendMessage }) => {
  return (
    <Grow in={isChatOpen} style={styles.grow}>
      <Box aria-label="chat" sx={styles.chat}>
        <Box aria-label="header" sx={styles.chatHeader}>
          <Typography variant="h5" sx={styles.chatTitle}>
            Chat
          </Typography>
        </Box>
        <Box aria-label="message-container" sx={styles.messageContainer}>
          <Typography variant="body1">Messages</Typography>

          {messages.map((msg) => (
            <TextMessage {...msg} key={Object.values(msg).join()} />
          ))}
        </Box>
        <Box aria-label="type-container" sx={styles.typeContainer}>
          <InputBase
            sx={styles.typeField}
            placeholder="Enter message here"
            autoComplete="off"
            inputProps={styles.input}
            onChange={(event) => handleOnType(event.target.value)}
            multiline
          />
          <ButtonBase sx={styles.sendButton} onClick={handleSendMessage}>
            <Box aria-label="send-message-button">
              <SendIcon />
            </Box>
          </ButtonBase>
        </Box>
      </Box>
    </Grow>
  );
};

export default Chat;
