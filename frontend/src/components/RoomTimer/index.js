import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { getTimeInSeconds, getTimeInMins } from "common/utils";
import { styles } from "./styles";

const getTimerMessage = (timeInMs) => {
  return getTimeInMins(timeInMs)
    ? `${getTimeInMins(timeInMs)} mins left`
    : getTimeInSeconds(timeInMs) !== null && getTimeInSeconds(timeInMs) !== 0
    ? `${getTimeInSeconds(timeInMs)} secs left`
    : getTimeInSeconds(timeInMs) === 0
    ? "Times up. Please end the session to record completion of question."
    : "Timer not initiated";
};

const RoomTimer = ({ timeInMs }) => {
  return (
    <Box sx={styles.container}>
      <Typography variant="h4">{getTimerMessage(timeInMs)}</Typography>
    </Box>
  );
};

export default RoomTimer;
