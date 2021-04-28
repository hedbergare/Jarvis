import { FETCH_SHARED_GOALS } from "../constants";

const INITIAL_STATE = null;

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_SHARED_GOALS:
      return action.shared_goals;
    default:
      return state;
  }
};
