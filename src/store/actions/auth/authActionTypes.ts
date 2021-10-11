export const LOGIN = "LOGIN"; //si el token es valido
export const SET_ERROR_MSG = "SET_ERROR_MSG"; //mensaje de error (crenediales incorrectas)
export const REMOVE_ERROR = "REMOVE_ERROR"; //remover mensaje de error
export const NOT_AUTH = "NOT_AUTH"; //token no valido
export const LOGOUT = "LOGOUT"; //cerrar sesion

type LoginAction = {
  type: typeof LOGIN;
  payload: {
    token: string;
    username: string;
    name: string;
  };
};

type SetErrorMessageAction = {
  type: typeof SET_ERROR_MSG;
  payload: string;
};

type RemoveErrorMessageAction = {
  type: typeof REMOVE_ERROR;
};

type NotAuthAction = {
  type: typeof NOT_AUTH;
};

type LogoutAction = {
  type: typeof LOGOUT;
};

export type AuthActionTypes =
  | LoginAction
  | SetErrorMessageAction
  | RemoveErrorMessageAction
  | NotAuthAction
  | LogoutAction;
