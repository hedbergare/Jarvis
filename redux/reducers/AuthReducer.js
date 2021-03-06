import { SIGN_IN } from "../constants";

const INITIAL_STATE = null;

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return action.currentUser;
    default:
      return state;
  }
};
