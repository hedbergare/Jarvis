import { FETCH_SHARED_TASK_LISTS } from "../constants";
import { COMPLETE_SHARED_TASK } from "../constants";
const INITIAL_STATE = null;

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_SHARED_TASK_LISTS:
      return { ...state, sharedTaskLists: action.payload };
    case COMPLETE_SHARED_TASK:
      return { ...state };
    default:
      return { ...state };
  }
};
