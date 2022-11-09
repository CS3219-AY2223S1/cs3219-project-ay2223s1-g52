export const styles = {
  box: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "90vh",
  },
  historyContainer: {
    width: "40%",
    height: "80%",
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
  },
  paper: {
    width: "100%",
    height: "80%",
    marginTop: "16px",
    overflow: "auto",
    bgcolor: "secondary.light",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  noQuestionTextHolder: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  questionTitle: {
    marginLeft: "50px",
  },
  duration: {
    color: "rgb(105 108 112 / 60%)",
    textAlign: "right",
  },
  listItemButton: {
    bgcolor: "primary.light",
    display: "flex",
    justifyContent: "space-between",
    margin: "6px 0",
    boxShadow: 1,
    borderRadius: "8px",
    width: "95%",
    maxHeight: "10%",
    minHeight: "48px",
    "&:hover": {
      bgcolor: "primary.lessLight",
    },
  },
};
