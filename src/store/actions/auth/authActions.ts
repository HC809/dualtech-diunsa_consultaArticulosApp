import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dispatch } from "redux";
//Api
import { fetchAuth } from "../../../helpers/api";
//Models
import { IApiResponse } from "../../../models/shared/IApiResponse";
import { ILogin } from "../../../models/ILogin";
//UI actions
import { startSubmit, finishSubmit } from "../ui/loadingActions";
//Action-Types
import {
  LOGIN,
  REMOVE_ERROR,
  SET_ERROR_MSG,
  NOT_AUTH,
  LOGOUT,
} from "./authActionTypes";
import { Alert } from "react-native";

const login = (token: string, username: string, name: string) => {
  return { type: LOGIN, payload: { token, username, name } };
};

export const setErrorMsg = (msg: string) => {
  return { type: SET_ERROR_MSG, payload: msg };
};

export const removeErrorMsg = () => {
  return { type: REMOVE_ERROR };
};

export const notAuth = () => {
  return { type: NOT_AUTH };
};

export const logout = () => {
  return { type: LOGOUT };
};

export const startLogin = (model: ILogin) => {
  return async (dispatch: Dispatch) => {
    dispatch(startSubmit());

    try {
      const response: IApiResponse = await fetchAuth.login(model);
      if (response.ok) {
        const { token, username, name } = response.data;
        await AsyncStorage.setItem("token", token);
        dispatch(finishSubmit(false));
        dispatch(login(token, username, name));
      } else {
        dispatch(finishSubmit(false));
        Alert.alert("Error", response.errorMsg, [
          {
            text: "Ok",
          },
        ]);
      }
    } catch (e) {
      dispatch(finishSubmit(false));
      Alert.alert("API Error", "Request failed with status code 404", [
        {
          text: "Ok",
        },
      ]);
    }
  };
};
