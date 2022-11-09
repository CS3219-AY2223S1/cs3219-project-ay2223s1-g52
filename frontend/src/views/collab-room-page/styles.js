export const styles = {
  mainContainer: {
    height: "90%",
    display: "inline-block",
    width: "100%",
  },
  timerHolder: {
    width: "100%",
  },
  itemContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    height: "92%",
    maxHeight: "120vh",
    flexFlow: "row wrap",
    bgcolor: "secondary.light",
  },
  bottomActionBackground: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    bgcolor: "secondary.light",
    paddingTop: "20px",
  },
  bottomActionHolder: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
  },
  endSessionButton: {
    height: "40px",
    bgcolor: "primary.mainColor",
    "&:hover": {
      bgcolor: "primary.dark",
    },
  },
};
