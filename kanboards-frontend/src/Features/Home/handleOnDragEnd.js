import { updateUserInDb } from "./../ApiClient/crudOperations";

const handleDragEnd = (result, globalData) => {
  const { destination, source, type } = result;

  if (
    !destination ||
    (destination.droppableId === source.droppableId &&
      destination.index === source.index)
  ) {
    return;
  }

  if (type === "board" || type === "boardList") {
    handleBoardDragEnd(globalData, source, destination);
  }

  if (type === "column") {
    handleColumnDragEnd(globalData, source, destination);
  }

  if (type === "boardItem") {
    handleBoardItemDragEnd(globalData, source, destination);
  }

  if (type === "task") {
    handleTaskDragEnd(globalData, source, destination);
  }
};
export default handleDragEnd;

function handleTaskDragEnd(globalData, source, destination) {
  const sourceBoardItem = globalData.boardItems[source.droppableId];

  const taskIdsCopy = Array.from(sourceBoardItem.taskIds);

  sourceBoardItem.taskIds.splice(source.index, 1);
  sourceBoardItem.taskIds.splice(
    destination.index,
    0,
    taskIdsCopy[source.index]
  );

  globalData.updateTasks(globalData.tasks);
  updateUserInDb(globalData.user);
}

function handleBoardItemDragEnd(globalData, source, destination) {
  const sourceColumn = globalData.columns[source.droppableId];
  const destinationColumn = globalData.columns[destination.droppableId];

  const sourceBoardItemIdsCopy = Array.from(sourceColumn.boardItemIds);

  sourceColumn.boardItemIds.splice(source.index, 1);
  destinationColumn.boardItemIds.splice(
    destination.index,
    0,
    sourceBoardItemIdsCopy[source.index]
  );

  globalData.updateBoardItems(globalData.boardItems);
  updateUserInDb(globalData.user);
}

function handleColumnDragEnd(globalData, source, destination) {
  const sourceBoard = globalData.boards[source.droppableId];
  const destinationBoard = globalData.boards[destination.droppableId];

  const sourceColumnIdsCopy = Array.from(sourceBoard.columnIds);

  sourceBoard.columnIds.splice(source.index, 1);
  destinationBoard.columnIds.splice(
    destination.index,
    0,
    sourceColumnIdsCopy[source.index]
  );

  globalData.updateColumns(globalData.columns);
  updateUserInDb(globalData.user);
}

function handleBoardDragEnd(globalData, source, destination) {
  const user = globalData.user;
  const boardIdsCopy = Array.from(user.boardIds);
  user.boardIds.splice(source.index, 1);
  user.boardIds.splice(destination.index, 0, boardIdsCopy[source.index]);
  globalData.updateBoards(globalData.boards);
  updateUserInDb(globalData.user);
}
