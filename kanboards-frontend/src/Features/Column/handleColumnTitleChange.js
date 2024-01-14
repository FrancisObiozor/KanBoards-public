import { updateUserInDb } from "./../ApiClient/crudOperations";

export const titleChange = (e, updateTitle) => {
  updateTitle(e.target.value);
};

export const editTitle = (setIsEditing) => {
  setIsEditing(true);
};

export const saveTitle = (globalData, columnGlobal, title, setIsEditing) => {
  columnGlobal.title = title;
  globalData.updateColumns(globalData.columns);
  updateUserInDb(globalData.user);
  setIsEditing(false);
};

export const cancelEdit = (setIsEditing) => {
  setIsEditing(false);
};
