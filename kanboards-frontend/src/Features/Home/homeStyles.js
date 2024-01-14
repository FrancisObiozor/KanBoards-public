const homeStyles = {
  board: (open, width, topMargin) => {
    if (open === true) {
      return {
        width: `calc(100% - ${width}px)`,
        marginLeft: `${width}px`,
        marginTop: `${topMargin + 10}px`,
      };
    } else {
      return { marginTop: `${topMargin + 60}px` };
    }
  },
  tooltip: (open, topMargin) => {
    return {
      ml: 2,
      mr: 2,
      position: "fixed",
      top: `${topMargin}px`,
      ...(open && { display: "none" }),
      backgroundColor: "#0275d8",
      color: "white",
      mt: 1,
    };
  },
};
export default homeStyles;
