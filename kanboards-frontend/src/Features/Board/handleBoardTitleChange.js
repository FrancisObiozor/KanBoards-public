import { updateUserInDb } from "./../ApiClient/crudOperations";
export const titleChange = (e, updateTitle) => {
  updateTitle(e.target.value);
};

export const editTitle = (setIsEditing) => {
  setIsEditing(true);
};

export const saveTitle = (globalData, boardGlobal, title, setIsEditing) => {
  boardGlobal.title = title;
  globalData.updateBoards(globalData.boards);
  updateUserInDb(globalData.user);
  setIsEditing(false);
};

export const cancelEdit = (setIsEditing) => {
  setIsEditing(false);
};
