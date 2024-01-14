import { createContext, useReducer } from "react";
import { node } from "prop-types";
import ACTIONS from "./ActionTypes";
import AppReducer from "./AppReducer";
import { boards } from "../Data/boards";
import { columns } from "../Data/columns";
import { boardItems } from "../Data/boardItems";
import { tasks } from "../Data/tasks";
import { user } from "../Data/user";

// Initial State
const initialState = {
  user: user,
  boards: boards,
  columns: columns,
  boardItems: boardItems,
  tasks: tasks,
};

// Props
const propTypes = {
  children: node.isRequired,
};

// Create context
export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const updateUser = (user) => {
    dispatch({
      type: ACTIONS.UPDATE_USER,
      payload: user,
    });
  };

  const updateBoards = (boards) => {
    dispatch({
      type: ACTIONS.UPDATE_BOARDS,
      payload: boards,
    });
  };

  const updateColumns = (columns) => {
    dispatch({
      type: ACTIONS.UPDATE_COLUMNS,
      payload: columns,
    });
  };

  const updateBoardItems = (boardItems) => {
    dispatch({
      type: ACTIONS.UPDATE_BOARD_ITEMS,
      payload: boardItems,
    });
  };

  const updateTasks = (tasks) => {
    dispatch({
      type: ACTIONS.UPDATE_TASKS,
      payload: tasks,
    });
  };
  // --------------------------------------------------------------------------

  const stateObj = {
    ...state,
    updateUser: updateUser,
    updateBoards: updateBoards,
    updateColumns: updateColumns,
    updateBoardItems: updateBoardItems,
    updateTasks: updateTasks,
  };

  return (
    <GlobalContext.Provider value={stateObj}>{children}</GlobalContext.Provider>
  );
};

export default GlobalProvider;

GlobalProvider.propTypes = propTypes;
