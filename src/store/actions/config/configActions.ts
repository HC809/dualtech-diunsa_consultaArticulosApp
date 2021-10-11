//import { RESET_STORE } from "../../../constants/shared";
import { CHANGE_THEME } from "./configActionsTypes";

export const changeTheme = (theme: string) => {
  return { type: CHANGE_THEME, payload: theme };
};

// export const resetStore = () => {
//   return {
//     type: RESET_STORE,
//   };
// };
