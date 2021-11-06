export interface Indentity {
  id: string;
}

export interface Collection {
  id: string;
  name: string;
}

export interface Project {
  id: string;
  project: string;
  collections: [Collection];
}

export interface User extends Indentity {
  name: string;
}

export interface Entity extends Indentity {
  [key: string]: any;
}

export type EntityList = Entity[];

// { users: [{ id: 1, name: 'user1' }], hobbies: [{ id: 1, name: 'football' }]
export interface ResponseData<T> {
  loading: boolean;
  data: T;
  error?: string;
}

export interface Entites {
  [key: string]: ResponseData<EntityList>;
}
export interface EntitiesItem {
  key: string;
  data: ResponseData<EntityList>;
}

export interface AxiosResponseData<T> {
  code: number;
  data: T;
  message?: string;
}
