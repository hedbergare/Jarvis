import { ADD_GOAL, FETCH_OWN_GOALS } from "../constants";

const INITIAL_STATE = null;

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_OWN_GOALS:
      return action.goals;
    case ADD_GOAL:
      return state;
    default:
      return state;
  }
};
