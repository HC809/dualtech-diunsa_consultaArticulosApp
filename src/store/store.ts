import { combineReducers } from "redux";
//import { RESET_STORE } from "../constants/shared";
//Reducers
import configReducer from "./reducers/configReducer";
import authReducer from "./reducers/authReducer";
import uiReducer from "./reducers/uiReducer";

const Reducers = combineReducers({
  config: configReducer,
  auth: authReducer,
  ui: uiReducer,
});

// const rootReducer = (state, action) => {
//   if (action.type === RESET_STORE) state = undefined;

//   return Reducers(state, action);
// };

export default Reducers;

export type RootState = ReturnType<typeof Reducers>;
