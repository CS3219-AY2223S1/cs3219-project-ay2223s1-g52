export const styles = {
  page: {
    height: "100%",
  },
  mainContainer: {
    mt: "20%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    bgcolor: "primary.mainColor",
    boxShadow: 24,
    borderRadius: "10px",
    height: "80%",
    justifyContent: "space-evenly",
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
  signInButton: {
    flexGrow: 1,
    color: "black",
    bgcolor: "primary.light",
    "&:hover": {
      bgcolor: "secondary.light",
    },
  },
  signUpLink: {
    flexGrow: 1,
    color: "black",
    textDecoration: "underline",
  },
};
