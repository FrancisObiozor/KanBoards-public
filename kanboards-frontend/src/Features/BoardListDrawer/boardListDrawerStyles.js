const boardListDrawerStyles = {
  collapseButton: (topMargin) => {
    return { marginTop: `${topMargin}px` };
  },
  boardList: {
    maxWidth: "140px",
    ml: 1,
  },
  setMaxWidthForMobile: (isMobile) => {
    boardListDrawerStyles.boardList.maxWidth = isMobile ? "140px" : "300px";
  },
  titleInput: {
    width: "100%",
    fontSize: "20px",
    height: "40px",
    borderWidth: "2px",
    borderRadius: "5px",
    padding: "5px",
  },
  newBoardButton: {
    mt: 3,
    ml: 1,
    mr: 1,
    display: "flex",
    justifyContent: "center",
  },
};

export default boardListDrawerStyles;
