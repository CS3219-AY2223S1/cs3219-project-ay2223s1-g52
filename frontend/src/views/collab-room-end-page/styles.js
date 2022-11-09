export const styles = {
  mainContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "90vh",
  },
  subContainer: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    height: "50%",
  },
  mainText: {
    width: "70%",
    textAlign: "center",
    color: "primary.dark",
    fontWeight: 700,
  },
  subText: {
    textAlign: "center",
  },
  icon1: {
    width: "150px",
    height: "150px",
    color: "#e84a36",
  },
  icon2: {
    width: "150px",
    height: "150px",
    color: "#cacd33",
  },

  icon3: {
    width: "150px",
    height: "150px",
    color: "#527ad3",
  },
  buttonHolder: {
    display: "flex",
    flexDirection: "row-reverse",
    width: "120%",
    marginTop: "4%",
  },
  returnButton: {
    bgcolor: "primary.mainColor",
    "&:hover": {
      bgcolor: "primary.dark",
    },
  },
};
