import { FETCH_SHOPPING_LISTS } from "../constants";

const INITIAL_STATE = null;

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_SHOPPING_LISTS:
      return action.shopping_lists;
    default:
      return state;
  }
};
