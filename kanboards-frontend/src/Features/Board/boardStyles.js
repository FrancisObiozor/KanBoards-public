const boardStyles = {
  board: {
    mt: 2,
    bgcolor: "#f9f9f9",
    p: 4,
    mr: 2,
    ml: 2,
    borderRadius: "10px",
    borderStyle: "solid",
    borderWidth: "1px",
    display: "flex",
    maxHeight: "85vh",
    flexDirection: "row",
  },
  columnsContainer: {
    display: "flex",
    overflowX: "auto",
    gap: 2,
  },

  button: {
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "black",
    borderRadius: "5px",
    minHeight: "75px",
    fontWeight: "bold",
  },

  boardTitle: {
    mb: 2,
  },

  firstColumn: {
    height: "100%",
    pr: 2,
    mr: 2,
    borderRightStyle: "solid",
    borderWidth: "1px",
  },

  columns: {
    bgcolor: "primary.main",
    p: 1,
    borderRadius: "10px",
    borderStyle: "solid",
    borderWidth: "2px",
    borderColor: "black",
  },
  styleForMobileScreens: (isMobile) => {
    boardStyles.board.flexDirection = isMobile ? "column" : "row";
    boardStyles.button.minHeight = isMobile ? "25px" : "75px";
    boardStyles.firstColumn.borderRightStyle = isMobile ? "" : "solid";
    boardStyles.firstColumn.mb = isMobile ? 2 : 0;
  },
  titleInput: {
    width: "100%",
    fontSize: "20px",
    height: "40px",
    borderWidth: "2px",
    borderRadius: "5px",
    padding: "5px",
  },
};
export default boardStyles;
