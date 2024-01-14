import { v4 as uuidv4 } from "uuid";
import { updateUserInDb } from "./../ApiClient/crudOperations";

export const addColumn = (globalData, board) => {
  const newUUID = uuidv4();
  const newColumn = {
    id: newUUID,
    title: "New",
    boardItemIds: [],
  };
  board.columnIds.unshift(newUUID);
  globalData.columns[newUUID] = newColumn;
  globalData.updateColumns(globalData.columns);
  updateUserInDb(globalData.user);
};

export const deleteColumn = (globalData, board, column) => {
  //Delete column id from column ids list within the board
  const columnIndex = board.columnIds.findIndex((item) => item === column.id);
  board.columnIds.splice(columnIndex, 1);

  //Note column can't be delete till all boardItems are deleted

  //Delete column
  delete globalData.columns[column.id];
  globalData.updateColumns(globalData.columns);
  updateUserInDb(globalData.user);
};
