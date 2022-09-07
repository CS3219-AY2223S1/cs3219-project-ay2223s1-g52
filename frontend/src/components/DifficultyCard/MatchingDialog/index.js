import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import MatchingDialogContent from "../MatchingDialogContent";

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
      <DialogTitle>Find a match for Difficulty: {difficulty.title}</DialogTitle>
      <MatchingDialogContent
        {...{ timer, success, failure, loading, error, handleMatchButtonClick }}
      />
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default MatchingDialog;
