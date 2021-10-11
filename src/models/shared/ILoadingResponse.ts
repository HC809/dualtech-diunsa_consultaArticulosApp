export interface ILoadingResponse {
  loading: boolean;
  wasSuccessfull: boolean;
  msgError: string;
}

export interface IUILoading {
  submitLoading: ILoadingResponse;
  validarOTLoading: ILoadingResponse;
  cantidadSugeridaLoading: ILoadingResponse;
  enviarListaProductosLoading: ILoadingResponse;
  deleteLoading: ILoadingResponse;
}
