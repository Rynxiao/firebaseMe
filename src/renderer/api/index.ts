import { Entity, Project } from '../states/types';
import request from './request';

export const getProjects = () => {
  return request<Project[]>({
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

export const getDocuments = (collectionPath: string, projectId: string) => {
  return request<Entity[]>({
    url: 'documents',
    params: { path: collectionPath, projectId },
    method: 'get',
  });
};
