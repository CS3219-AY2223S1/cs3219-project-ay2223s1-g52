export const styles = {
  mainContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    height: "90vh",
  },
  bottomActionHolder: {
    width: "100%",
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    mt: "20px",
    position: "relative",
    bgcolor: "secondary.light",
  },
  returnButton: {
    height: "40px",
    mr: "5%",
    bgcolor: "primary.mainColor",
    "&:hover": {
      bgcolor: "primary.dark",
    },
  },
};
