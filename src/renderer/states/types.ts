export interface Indentity {
  id: string;
}

export interface Collection {
  id: number;
  name: string;
}

export interface Project {
  id: number;
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

// { users: [{ id: 1, name: 'user1' }], hobbies: [{ id: 1, name: 'football' }] }

export interface EntitiesItem {
  key: string;
  list: EntityList;
}
export interface Entites {
  [key: string]: EntityList;
}

export interface Response<T> {
  loading: boolean;
  data: T;
  error?: string;
}
