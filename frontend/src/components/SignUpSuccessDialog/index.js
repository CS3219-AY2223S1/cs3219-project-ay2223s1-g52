import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { styles } from "./styles";

export default function SuccessSignInDialog(isSignupSuccess) {
  const navigate = useNavigate();

  const handleCloseDialog = () => {
    navigate("/login");
  };

  return (
    <Dialog
      open={isSignupSuccess}
      onClose={handleCloseDialog}
      maxWidth={"sm"}
      fullWidth
    >
      <DialogTitle>Successful Sign Up!</DialogTitle>
      <DialogContent>
        <DialogContentText color={"black"}>
          Going back to the sign in page.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} autoFocus sx={styles.button}>
          Okay
        </Button>
      </DialogActions>
    </Dialog>
  );
}
