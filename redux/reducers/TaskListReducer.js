import {
  FETCH_TASK_LISTS,
  ADD_TASK_LIST,
  ADD_TASK,
  COMPLETE_TASK,
  SHARE_TASK_LIST,
  EDIT_TASK_LIST,
  DELETE_TASK_LIST,
  DELETE_TASK,
  EDIT_TASK,
} from "../constants";

const INITIAL_STATE = null;

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_TASK_LISTS:
      return action.task_lists;
    case ADD_TASK_LIST:
      return state;
    case ADD_TASK:
      return state;
    case COMPLETE_TASK:
      return state;
    case SHARE_TASK_LIST:
      return state;
    case EDIT_TASK_LIST:
      return state;
    case EDIT_TASK:
      return state;
    case DELETE_TASK_LIST:
      return state;
    case DELETE_TASK:
      return state;
    default:
      return state;
  }
};
