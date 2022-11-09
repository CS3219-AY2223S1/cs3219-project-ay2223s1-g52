import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";

import MatchingDialogContent from "../MatchingDialogContent";
import { styles } from "./styles";

const MatchingDialog = ({
  difficulty,
  open,
  handleClose,
  timer,
  success,
  failure,
  loading,
  error,
  handleMatchButtonClick,
}) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth={"sm"} fullWidth>
      <Box sx={styles.dialog}>
        <DialogTitle>
          Find a match for Difficulty: {difficulty.title}
        </DialogTitle>
        <MatchingDialogContent
          {...{
            timer,
            success,
            failure,
            loading,
            error,
            handleMatchButtonClick,
          }}
        />
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default MatchingDialog;
