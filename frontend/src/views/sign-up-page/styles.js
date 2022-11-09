export const styles = {
  page: {
    height: "100%",
  },
  mainContainer: {
    position: "relative",
    mt: "20%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    bgcolor: "primary.lessLight",
    boxShadow: 24,
    borderRadius: "10px",
    height: "80%",
    justifyContent: "space-evenly",
  },
  backButton: {
    position: "absolute",
    left: 5,
    top: 5,
  },
  icon: {
    m: 1,
    bgcolor: "secondary.light",
    color: "black",
  },
  invalidAlert: {
    mt: 2,
  },
  formContainter: {
    mt: 3,
    padding: 2,
  },
  buttons: {
    mt: 2,
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "flex-end",
    flexWrap: "wrap",
  },
  signUpButton: {
    flexGrow: 1,
    color: "black",
    bgcolor: "primary.light",
    "&:hover": {
      bgcolor: "secondary.light",
    },
  },
};
