import { THEME_LIGHT } from "../../constants/shared";
import {
  ConfigActionTypes,
  CHANGE_THEME,
} from "../actions/config/configActionsTypes";

const initialState = {
  themeMode: THEME_LIGHT,
};

const themeReducer = (state = initialState, action: ConfigActionTypes) => {
  switch (action.type) {
    case CHANGE_THEME:
      return {
        themeMode: action.payload,
      };

    default:
      return state;
  }
};

export default themeReducer;
