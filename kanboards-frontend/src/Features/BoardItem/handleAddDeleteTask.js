import { v4 as uuidv4 } from "uuid";
import { updateUserInDb } from "./../ApiClient/crudOperations";

export const addTask = (boardItem, globalData) => {
  const newUUID = uuidv4();
  const newTask = {
    id: newUUID,
    boardItemId: boardItem.id,
    title: "",
    description: "",
    isCompleted: false,
  };
  boardItem.taskIds.unshift(newUUID);
  globalData.tasks[newUUID] = newTask;
  globalData.updateTasks(globalData.tasks);
  updateUserInDb(globalData.user);
};

export const deleteTask = (taskId, index, boardItem, globalData) => {
  delete globalData.tasks[taskId];
  boardItem.taskIds.splice(index, 1);
  globalData.updateTasks(globalData.tasks);
  updateUserInDb(globalData.user);
};
