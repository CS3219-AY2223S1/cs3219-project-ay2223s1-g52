import React from "react";
import Box from "@mui/material/Box";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import CheckIcon from "@mui/icons-material/Check";
import Grow from "@mui/material/Grow";
import { useStyles } from "./useStyles";

const DialogContentGrowText = ({ text, state, styles }) => (
  <Grow in={state} {...(state ? { timeout: 2000 } : {})}>
    <Typography variant="subtitle1" sx={styles.growText}>
      {text}
    </Typography>
  </Grow>
);

const MatchingDialogContent = ({
  timer,
  success,
  failure,
  loading,
  error,
  handleMatchButtonClick,
}) => {
  const styles = useStyles(success, failure, error);

  const initState = !loading && !success && !error && !failure;

  return (
    <DialogContent>
      <DialogContentText sx={styles.contentText}>
        Note that you can only be matching in one difficulty at any time!
      </DialogContentText>
      <Box sx={styles.dialogContent}>
        <Box sx={styles.buttonHolder}>
          <IconButton
            role="matching-button"
            sx={styles.matchingButton}
            onClick={handleMatchButtonClick}
            disabled={success}
          >
            {success && <CheckIcon sx={styles.buttonText} />}
            {failure && (
              <Typography variant="h5" sx={styles.buttonText}>
                No Match
              </Typography>
            )}

            {loading && (
              <Typography variant="h5" sx={styles.buttonText}>
                {`${timer}s`}
              </Typography>
            )}

            {!loading && !success && !failure && (
              <Typography variant="h5" sx={styles.buttonText}>
                Match
              </Typography>
            )}
          </IconButton>
          {loading && (
            <CircularProgress
              size={168}
              thickness={1}
              sx={styles.circularProgress}
            />
          )}
        </Box>

        {initState && (
          <DialogContentGrowText
            text={"Click to start finding a match!"}
            state={initState}
            styles={styles}
          />
        )}
        {loading && (
          <DialogContentGrowText
            text={"Once matched, you will be redirected to a room."}
            state={loading}
            styles={styles}
          />
        )}
        {success && (
          <DialogContentGrowText
            text={"Match found! Redirecting to room..."}
            state={success}
            styles={styles}
          />
        )}
        {failure && (
          <DialogContentGrowText
            text={
              "Click to search for match again, or try selecting another difficulty?"
            }
            state={failure}
            styles={styles}
          />
        )}
        {error && (
          <DialogContentGrowText
            text={"Encountered issues when matching, please try again later!"}
            state={error}
            styles={styles}
          />
        )}
      </Box>
    </DialogContent>
  );
};

export default MatchingDialogContent;
