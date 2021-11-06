import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const baseURL = 'http://localhost:3000/api/';

const instance = axios.create({
  baseURL,
  timeout: 1000,
});

const request = <T = any, R = AxiosResponse<T>, D = any>(
  config: AxiosRequestConfig<D>
) => instance.request<T, R, D>(config);

export default request;
