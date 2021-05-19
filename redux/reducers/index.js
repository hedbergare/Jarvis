import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import TaskListReducer from "./TaskListReducer";
import SharedTaskListReducer from "./SharedTaskListReducer";
import GoalReducer from "./GoalReducer";
import SharedGoalReducer from "./SharedGoalReducer";
import ItemListReducer from "./ItemListReducer.js";
import SharedItemListReducer from "./SharedItemListReducer";
import OtherUsersReducer from "./OtherUsersReducer";

export default combineReducers({
  currentUser: AuthReducer,
  taskLists: TaskListReducer,
  sharedTaskLists: SharedTaskListReducer,
  goals: GoalReducer,
  sharedGoals: SharedGoalReducer,
  itemLists: ItemListReducer,
  sharedItemLists: SharedItemListReducer,
  otherUsers: OtherUsersReducer,
});
