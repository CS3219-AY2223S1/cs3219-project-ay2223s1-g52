import React from "react";
import Box from "@mui/material/Box";

import { styles } from "./styles";
import { Typography } from "@mui/material";

const UsersDisplay = ({ activeUsers }) => {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.activeIcon} />
      <Typography sx={styles.username} variant="subtitle2">
        {activeUsers}
      </Typography>
    </Box>
  );
};

export default UsersDisplay;
