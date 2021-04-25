import { FETCH_OWN_GOALS } from "../constants";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_OWN_GOALS:
      return action.goals;
    default:
      return state;
  }
};
