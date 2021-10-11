export const CHANGE_THEME = "CHANGE_THEME";

type ChangeThemeAction = {
  type: typeof CHANGE_THEME;
  payload: string;
};

export type ConfigActionTypes = ChangeThemeAction;
