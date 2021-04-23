import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import TaskListReducer from "./TaskListReducer";
import GoalReducer from "./GoalReducer";

export default combineReducers({
  currentUser: AuthReducer,
  taskLists: TaskListReducer,
  goals: GoalReducer,
});
