import { FETCH_SHARED_TASK_LISTS } from "../constants";

const INITIAL_STATE = null;

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_SHARED_TASK_LISTS:
      return action.shared_task_lists;
    default:
      return state;
  }
};
