import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styles } from "./styles";

const TextMessage = ({ username, text, time }) => {
  return (
    <Box sx={styles.textContainer}>
      <Box sx={styles.textHeader}>
        <Typography variant="body2" sx={styles.username}>
          {username}
        </Typography>
        <Typography variant="body2" sx={styles.time}>
          {time}
        </Typography>
      </Box>
      <Box sx={styles.textContent}>
        <Typography variant="subtitle1" sx={styles.text}>
          {text}
        </Typography>
      </Box>
    </Box>
  );
};

export default TextMessage;
