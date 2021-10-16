export interface Collection {
  id: number;
  name: number;
}

export interface Project {
  id: number;
  project: string;
  collections: [Collection];
}
