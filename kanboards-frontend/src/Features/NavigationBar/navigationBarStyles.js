const fontSize = "35px";

const navigationBarStyles = {
  linkTypography: {
    color: "white",

    "&:hover": {
      fontWeight: "bold",
      backgroundColor: "white",
      color: "#0275d8",
    },
  },

  linkContainer: {
    display: "flex",
    flexGrow: 1,
    gap: "20px",
    ml: 5,
  },

  logoTypography: {
    color: "white",
    ml: 1,
    fontSize: fontSize,
    "&:hover": {
      fontWeight: "bold",
    },
  },

  logoIcon: {
    color: "white",
    fontSize: fontSize,
    "&:hover": {
      fontWeight: "bold",
      color: "Gainsboro",
    },
  },
  welcome: {
    color: "white",
    fontSize: "19px",
    "&:hover": {
      fontWeight: "bold",
      backgroundColor: "#1c84c6",
      color: "white",
    },
  },
};

export default navigationBarStyles;
