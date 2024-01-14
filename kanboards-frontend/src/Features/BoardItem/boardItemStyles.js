const boardItemStyles = {
  boardItem: {
    mb: 2,
    borderRadius: "5px",
    borderStyle: "solid",
    borderWidth: "2px",
    borderColor: "black",
  },
  boardItemTextPrimary: {
    fontWeight: "bold",
    fontSize: "20px",
  },
  boardItemTextSecondary: {
    fontSize: "17px",
  },
  changeBgColorOfBoardItem: (isDragging, isChecked) => {
    if (isDragging) {
      return "Gainsboro";
    } else if (isChecked) {
      return "DarkGrey";
    } else {
      return "white";
    }
  },
  viewDetailsModal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    backgroundColor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  },
  componentLRmargin: {
    mr: "20px",
    ml: "20px",
  },
};

export default boardItemStyles;
