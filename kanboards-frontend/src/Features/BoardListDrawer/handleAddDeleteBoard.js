import { v4 as uuidv4 } from "uuid";
import { updateUserInDb } from "./../ApiClient/crudOperations";

export const addBoard = (globalData) => {
  const newUUID = uuidv4();
  const newBoard = {
    id: newUUID,
    title: "New Board",
    columnIds: [],
  };
  globalData.user.boardIds.unshift(newUUID);
  globalData.boards[newUUID] = newBoard;
  globalData.updateBoards(globalData.boards);
  updateUserInDb(globalData.user);
};

export const deleteBoard = (globalData, board) => {
  //Delete bpard id from board ids list within user
  const boardIndex = globalData.user.boardIds.findIndex(
    (item) => item === board.id
  );
  globalData.user.boardIds.splice(boardIndex, 1);

  //Note board can't be delete till all columns are deleted

  //Delete board
  delete globalData.boards[board.id];

  globalData.updateBoards(globalData.boards);
  updateUserInDb(globalData.user);
};
