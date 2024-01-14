import cloneDeep from "lodash/cloneDeep";
import { updateUserInDb } from "./../ApiClient/crudOperations";

export const handleClose = (
  globalData,
  boardItem,
  boardItemCopy,
  tasksCopy,
  formValues,
  setFormValues,
  setOpen
) => {
  boardItem.taskIds = [...boardItemCopy.taskIds];

  formValues.title = boardItemCopy.title;
  formValues.description = boardItemCopy.description;
  formValues.dueDate = new Date(boardItemCopy.dueDate);

  globalData.updateTasks(cloneDeep(tasksCopy));
  setFormValues(formValues);

  setOpen(false);
};

export const handleSave = (
  setOpen,
  formValues,
  setBoardItemCopy,
  setTasksCopy,
  boardItem,
  globalData
) => {
  boardItem.title = formValues.title;
  boardItem.description = formValues.description;
  boardItem.dueDate = new Date(formValues.dueDate);
  globalData.updateBoardItems(globalData.boardItems);
  updateUserInDb(globalData.user);

  setBoardItemCopy(cloneDeep(boardItem));
  setTasksCopy(cloneDeep(globalData.tasks));
  setOpen(false);
};

export const handleDate = (event, setFormValues) => {
  let { name, value } = event.target;
  let dateComponents = value.split("-");
  let year = parseInt(dateComponents[0]);
  let month = parseInt(dateComponents[1]) - 1;
  let day = parseInt(dateComponents[2]);

  setFormValues((prevValues) => {
    prevValues.dueDate.setFullYear(year);
    prevValues.dueDate.setMonth(month);
    prevValues.dueDate.setDate(day);
    return { ...prevValues, [name]: prevValues.dueDate };
  });
};

export const handleChange = (event, setFormValues) => {
  let { name, value } = event.target;
  setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
};
