import { v4 as uuidv4 } from "uuid";
import { updateUserInDb } from "./../ApiClient/crudOperations";

export const addBoardItem = (globalData, column) => {
  const newUUID = uuidv4();
  const newBoardItem = {
    id: newUUID,
    isDone: false,
    title: "Title",
    description: "Description",
    dueDate: new Date(),
    taskIds: [],
  };
  column.boardItemIds.unshift(newUUID);
  globalData.boardItems[newUUID] = newBoardItem;
  globalData.updateBoardItems(globalData.boardItems);
  updateUserInDb(globalData.user);
};

export const deleteBoardItem = (globalData, column, boardItem) => {
  //Delete boardItem id from boardItem ids list within the column
  const boardItemIndex = column.boardItemIds.findIndex(
    (item) => item === boardItem.id
  );
  column.boardItemIds.splice(boardItemIndex, 1);

  //Delete tasks within the boardItem
  boardItem.taskIds.map((taskId) => {
    return delete globalData.tasks[taskId];
  });

  //Finally delete the boardItem
  delete globalData.boardItems[boardItem.id];

  globalData.updateBoardItems(globalData.boardItems);
  updateUserInDb(globalData.user);
};
