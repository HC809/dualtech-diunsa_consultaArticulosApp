import axios, { AxiosResponse } from "axios";
import { IApiResponse } from "../models/shared/IApiResponse";
import { ILogin } from "../models/ILogin";
import { IArticulo } from "../models/IArticulo";

//URL AP
axios.defaults.baseURL = "http://172.40.20.181:8094/api";

const responseBody = (response: AxiosResponse) => response.data;

const headers = {
  "Content-Type": "application/json",
  ApiKey: "D!uNs@20214e6ec9740efe4310b665C0nsult@rt!cul0sK3Yrrgtsd3456543Dd",
};

const requests = {
  get: (url: string) =>
    axios.get(url, { headers, timeout: 15000 }).then(responseBody),
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
  get: (barCode: string, macAddress: string): Promise<IArticulo> =>
    requests.get(`/ConsultaArticulos/${barCode}/${macAddress}`),
};

export { fetchConsultaArticulos };
