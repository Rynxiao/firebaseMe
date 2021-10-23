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
