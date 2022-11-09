import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import useSignUp from "hooks/useSignUp";
import SuccessSignInDialog from "components/SignUpSuccessDialog";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

import { styles } from "./styles";

const SignUpPage = () => {
  const {
    handleSignUp,
    loading,
    isSignupFailure,
    errorMessage,
    isSignupSuccess,
  } = useSignUp();

  const navigate = useNavigate();

  const onBackButtonClick = () => {
    navigate("/login");
  };

  return (
    <Container component="main" maxWidth="xs" sx={styles.page}>
      <Box sx={styles.mainContainer}>
        <IconButton
          sx={styles.backButton}
          size="large"
          variant="outlined"
          onClick={onBackButtonClick}
        >
          <ArrowBackIcon />
        </IconButton>
        <Avatar sx={styles.icon}>
          <EmojiPeopleIcon />
        </Avatar>

        <Typography component="h1" variant="h4">
          Create Account
        </Typography>
        {isSignupFailure && (
          <Alert sx={styles.invalidAlert} severity="error">
            {errorMessage}
          </Alert>
        )}
        {SuccessSignInDialog(isSignupSuccess)}
        <Box
          component="form"
          onSubmit={handleSignUp}
          sx={styles.formContainter}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            disabled={loading}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            disabled={loading}
          />
          <Box sx={styles.buttons}>
            <Button
              loading={loading}
              loadingPosition="start"
              startIcon={<></>}
              type="submit"
              variant="contained"
              sx={styles.signUpButton}
            >
              Create Account
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUpPage;
