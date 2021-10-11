import {
  ILoadingResponse,
  IUILoading,
} from "../../models/shared/ILoadingResponse";
import {
  LoadingActionTypes,
  UI_START_SUBMIT_LOADING,
  UI_FINISH_SUBMIT_LOADING,
  UI_START_DELETE_LOADING,
  UI_FINISH_DELETE_LOADING,
} from "../actions/ui/loadingActionsTypes";

const initialLoadingState: ILoadingResponse = {
  loading: false,
  wasSuccessfull: false,
  msgError: "",
};

const initialState: IUILoading = {
  submitLoading: initialLoadingState,
  validarOTLoading: initialLoadingState,
  cantidadSugeridaLoading: initialLoadingState,
  enviarListaProductosLoading: initialLoadingState,
  deleteLoading: initialLoadingState,
};

const uiReducer = (state = initialState, action: LoadingActionTypes) => {
  switch (action.type) {
    //#region GENERAL
    case UI_START_SUBMIT_LOADING:
      return {
        ...state,
        submitLoading: { ...initialLoadingState, loading: true },
      };

    case UI_FINISH_SUBMIT_LOADING:
      return {
        ...state,
        submitLoading: {
          ...initialLoadingState,
          loading: false,
          wasSuccessfull: action.payload,
        },
      };

    case UI_START_DELETE_LOADING:
      return {
        ...state,
        deleteLoading: { ...initialLoadingState, loading: true },
      };

    case UI_FINISH_DELETE_LOADING:
      return {
        ...state,
        deleteLoading: {
          ...initialLoadingState,
          loading: false,
          wasSuccessfull: action.payload,
        },
      };
    //#endregion GENERAL

    default:
      return state;
  }
};

export default uiReducer;
