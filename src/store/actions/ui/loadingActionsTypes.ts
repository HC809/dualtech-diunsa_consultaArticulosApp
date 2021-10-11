//#region UI-GENERAL-CONSTANTS
export const UI_START_SUBMIT_LOADING = "UI_START_SUBMIT_LOADING";
export const UI_FINISH_SUBMIT_LOADING = "UI_FINISH_SUBMIT_LOADING";

export const UI_START_DELETE_LOADING = "UI_START_DELETE_LOADING";
export const UI_FINISH_DELETE_LOADING = "UI_FINISH_DELETE_LOADING";
//#endregion UI-GENERAL-CONSTANTS

//#region GENERAL-ACTIONS
interface StartSubmitLoadingAction {
  type: typeof UI_START_SUBMIT_LOADING;
}

interface FinishSubmitLoadingAction {
  type: typeof UI_FINISH_SUBMIT_LOADING;
  payload: boolean;
}

interface StartDeleteLoadingAction {
  type: typeof UI_START_DELETE_LOADING;
}

interface FinishDeleteLoadingAction {
  type: typeof UI_FINISH_DELETE_LOADING;
  payload: boolean;
}
//#endregion GENERAL-ACTIONS

export type LoadingActionTypes =
  | StartSubmitLoadingAction
  | FinishSubmitLoadingAction
  | StartDeleteLoadingAction
  | FinishDeleteLoadingAction;
