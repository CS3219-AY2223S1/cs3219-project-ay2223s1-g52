import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/lab/LoadingButton";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import { styles } from "./styles";
import useProfile from "hooks/useProfile";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

const ProfilePage = () => {
  const {
    handleDeleteUser,
    handleChangePassword,
    isInvalidAction,
    isSuccessAction,
    errorMessage,
    successMessage,
    isDelete,
    handleClickDelete,
    handleClickClose,
  } = useProfile();

  return (
    <Container sx={styles.main}>
      <Container sx={styles.container}>
        {isInvalidAction && (
          <Alert sx={styles.invalidAlert} severity="error">
            {errorMessage}
          </Alert>
        )}

        {isSuccessAction && (
          <Alert sx={styles.invalidAlert} severity="success">
            {successMessage}
          </Alert>
        )}

        <Dialog
          open={isDelete}
          onClose={handleClickClose}
          maxWidth={"sm"}
          fullWidth
        >
          <DialogTitle>Are you sure to delete this account?</DialogTitle>
          <DialogActions>
            <Button onClick={handleDeleteUser} autoFocus sx={styles.button}>
              Yes
            </Button>
          </DialogActions>
        </Dialog>

        <Box sx={styles.items}>
          <Box sx={styles.deleteContainer}>
            <Typography component="h1" variant="h5">
              Delete User
            </Typography>
            <Box sx={styles.buttons}>
              <Button
                loadingPosition="start"
                startIcon={<></>}
                type="submit"
                variant="contained"
                onClick={handleClickDelete}
                sx={styles.button}
              >
                Delete
              </Button>
            </Box>
          </Box>

          <Box
            component="form"
            onSubmit={handleChangePassword}
            sx={styles.formContainer}
          >
            <Typography component="h1" variant="h5">
              Change Password
            </Typography>
            <TextField
              margin="normal"
              required
              name="password"
              label="New Password"
              type="password"
              id="password"
              autoComplete="current-password"
              sx={styles.textField}
            />

            <Box sx={styles.buttons}>
              <Button
                loadingPosition="start"
                startIcon={<></>}
                type="submit"
                variant="contained"
                sx={styles.button}
              >
                Change Password
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Container>
  );
};

export default ProfilePage;
