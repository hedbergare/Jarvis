import { FETCH_TASK_LISTS, ADD_TASK_LIST, ADD_TASK } from "../constants";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_TASK_LISTS:
      return action.task_lists;
    case ADD_TASK_LIST:
      return state;
    case ADD_TASK:
      return state;
    default:
      return state;
  }
};
