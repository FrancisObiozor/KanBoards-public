import ACTIONS from "./ActionTypes.js";

const AppReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.UPDATE_USER:
      return {
        ...state,
        user: action.payload,
      };
    case ACTIONS.UPDATE_BOARDS:
      return {
        ...state,
        boards: action.payload,
      };
    case ACTIONS.UPDATE_COLUMNS:
      return {
        ...state,
        columns: action.payload,
      };
    case ACTIONS.UPDATE_BOARD_ITEMS:
      return {
        ...state,
        boardItems: action.payload,
      };
    case ACTIONS.UPDATE_TASKS:
      return {
        ...state,
        tasks: action.payload,
      };
    default:
      return state;
  }
};

export default AppReducer;
