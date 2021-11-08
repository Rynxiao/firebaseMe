import { atom } from 'jotai';
import { isEmpty } from 'lodash';
import { getProjects } from 'renderer/api';
import { Project, ResponseData } from './types';

const projectAtom = atom<ResponseData<Project[]>>({ loading: false, data: [] });

export const fetchProjectAtom = atom<ResponseData<Project[]>, undefined>(
  (get) => get(projectAtom),
  async (get, set) => {
    const projects = get(projectAtom);
    if (isEmpty(projects.data)) {
      set(projectAtom, { loading: true, data: [] });
      const data = await getProjects();
      set(projectAtom, { loading: false, data: data || [] });
    }
  }
);

export default projectAtom;
