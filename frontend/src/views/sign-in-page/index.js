import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/lab/LoadingButton";
import CssBaseline from "@mui/material/CssBaseline";
import { Link } from "@mui/material";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import { styles } from "./styles";
import useLogin from "hooks/useLogin";

const SignInPage = () => {
  const { handleLogin, loading, isInvalidLogin } = useLogin();

  return (
    <Container component="main" maxWidth="xs" sx={styles.page}>
      <CssBaseline />
      <Box sx={styles.mainContainer}>
        <Avatar sx={styles.icon}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h4">
          Sign In
        </Typography>
        {isInvalidLogin && (
          <Alert sx={styles.invalidAlert} severity="error">
            Incorrect username or password
          </Alert>
        )}
        <Box component="form" onSubmit={handleLogin} sx={styles.formContainter}>
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
            sx={styles.textField}
          />

          <Box sx={styles.buttons}>
            <Button
              loading={loading}
              loadingPosition="start"
              startIcon={<></>}
              type="submit"
              variant="contained"
              sx={styles.signInButton}
            >
              Sign In
            </Button>
          </Box>
        </Box>
        <Typography variant="subtitle1">
          Dont have account? Create account{" "}
          <Link href="/signup" sx={styles.signUpLink}>
            here
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default SignInPage;
