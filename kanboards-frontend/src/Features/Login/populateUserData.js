import { boards } from "../../Data/boards";
import { columns } from "../../Data/columns";
import { boardItems } from "../../Data/boardItems";
import { tasks } from "../../Data/tasks";
import { user } from "../../Data/user";

export const populateUserData = (userData) => {
  user.id = userData.id;
  user.authId = userData.authId;
  user.boardIds = userData.boardIds;

  if (isNullOrUndefined(boards)) {
    for (let key in userData.boards) {
      boards[key] = userData.boards[key];
    }
    user.boards = boards;
  } else {
    user.boards = boards;
  }

  if (isNullOrUndefined(columns)) {
    for (let key in userData.columns) {
      columns[key] = userData.columns[key];
    }
    user.columns = columns;
  } else {
    user.columns = columns;
  }

  if (isNullOrUndefined(boardItems)) {
    for (let key in userData.boardItems) {
      boardItems[key] = userData.boardItems[key];
      boardItems[key].dueDate = new Date(boardItems[key].dueDate);
    }
    user.boardItems = boardItems;
  } else {
    user.boardItems = boardItems;
  }

  if (isNullOrUndefined(tasks)) {
    for (let key in userData.tasks) {
      tasks[key] = userData.tasks[key];
    }
    user.tasks = tasks;
  } else {
    user.tasks = tasks;
  }
};

const isNullOrUndefined = (obj) => {
  if (obj !== null && obj !== undefined) {
    return true;
  } else {
    return false;
  }
};
