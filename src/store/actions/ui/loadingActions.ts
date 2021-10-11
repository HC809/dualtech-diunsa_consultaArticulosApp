//Constants
import {
  UI_START_SUBMIT_LOADING,
  UI_FINISH_SUBMIT_LOADING,
  UI_START_DELETE_LOADING,
  UI_FINISH_DELETE_LOADING,
} from "./loadingActionsTypes";

export const startSubmit = () => ({
  type: UI_START_SUBMIT_LOADING,
});

export const finishSubmit = (isSucces: boolean) => ({
  type: UI_FINISH_SUBMIT_LOADING,
  payload: isSucces,
});

export const startDelete = () => ({
  type: UI_START_DELETE_LOADING,
});

export const finishDelete = (isSucces: boolean) => ({
  type: UI_FINISH_DELETE_LOADING,
  payload: isSucces,
});
