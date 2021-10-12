import axios, { AxiosResponse } from "axios";
import { IApiResponse } from "../models/shared/IApiResponse";
import { ILogin } from "../models/ILogin";
import { IArticulo } from '../models/IArticulo';

//URL AP
axios.defaults.baseURL = "http://172.40.20.181:8094/api";

const responseBody = (response: AxiosResponse) => response.data;

// axios.interceptors.request.use(async (config) => {
//   const token = await AsyncStorage.getItem("token");
//   if (token) {
//     config.headers = {
//       Authorization: `Bearer ${token}`,
//     };
//   }
//   return config;
// });

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  del: (url: string) => axios.delete(url).then(responseBody),
};

//Auth Endpoints
const fetchAuth = {
  login: (model: ILogin): Promise<IApiResponse> =>
    requests.post(`/users/authenticate`, {
      Username: model.username,
      Password: model.password,
    }),
};

//Entrada Endpoints
const fetchConsultaArticulos = {
  get: (barCode: string): Promise<IArticulo> =>
    requests.get(`/ConsultaArticulos/${barCode}`),
};

export { fetchConsultaArticulos };
