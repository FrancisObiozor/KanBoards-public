const columnStyles = {
  column: {
    backgroundColor: "primary.main",
    p: 1,
    borderRadius: "10px",
    borderStyle: "solid",
    borderWidth: "2px",
    borderColor: "black",
    minHeight: "100px",
    minWidth: "280px",
    maxWidth: "400px",
  },

  button: {
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "white",
    borderRadius: "5px",
    fontWeight: "bold",
    mt: 3,
  },
  changeColorOfDroppableDuringDrag: (isDraggingOver) =>
    isDraggingOver ? "Gainsboro" : "primary.main",
  titleInput: {
    width: "100%",
    fontSize: "20px",
    height: "40px",
    borderWidth: "2px",
    borderRadius: "5px",
    padding: "5px",
  },
};
export default columnStyles;
