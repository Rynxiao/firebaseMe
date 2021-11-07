import { AxiosResponseData, Project } from '../states/types';
import request from './request';

export const getProjects = () => {
  return request<AxiosResponseData<Project[]>>({
    url: 'projects',
    method: 'get',
  });
};

export const uploadServiceAccount = (formData: FormData) => {
  return request({
    url: 'upload',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
