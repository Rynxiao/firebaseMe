import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

const baseURL = 'http://localhost:3000/api/';

const instance = axios.create({
  baseURL,
  // timeout: 5000,
});

const request = <T = any, R = AxiosResponse<T>, D = any>(
  config: AxiosRequestConfig<D>
) =>
  instance.request<T, R, D>(config).then((response) => {
    // ts-ignore
    const res = (response as any).data;
    if (res.code !== 200) {
      toast.error(res.message);
      return null;
    }

    return res.data as T;
  });

export default request;
