import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { getToken } from './token';
import { toast } from 'react-toastify';
import { StatusCodes } from 'http-status-codes';

const BACKEND_URL = 'https://14.design.htmlacademy.pro/six-cities';
const REQUEST_TIMEOUT = 5000;
const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.NOT_FOUND]: true,
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.BAD_GATEWAY]: true,
  [StatusCodes.GATEWAY_TIMEOUT]: true,
  [StatusCodes.CONFLICT]: true,
};
const shouldDisplayError = (response: AxiosResponse) =>
  !!StatusCodeMapping[response.status];

type DetailMessageType = {
  type: string;
  message: string;
};

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getToken();

    if (token && config.headers) {
      config.headers['X-Token'] = token;
    }

    return config;
  });
  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<DetailMessageType>) => {
      if (error.response && shouldDisplayError(error.response)) {
        const detailMessage = error.response.data;
        toast.error(detailMessage.message);
      }
      throw error;
    }
  );

  return api;
};
