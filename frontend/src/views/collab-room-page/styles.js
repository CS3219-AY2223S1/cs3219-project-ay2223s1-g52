export const styles = {
  mainContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    height: "90vh",
  },
  split: {
    display: "flex",
    height: "90%",
    width: "90%",
  },

  panel: {
    bgcolor: "#f9f9f9",
    overflow: "auto",
  },
  buttonHolder: {
    width: "90%",
    display: "flex",
    flexDirection: "row-reverse",
  },
  endSessionButton: {
    mt: "28px",
    bgcolor: "primary.mainColor",
    "&:hover": {
      bgcolor: "primary.dark",
    },
  },
};
