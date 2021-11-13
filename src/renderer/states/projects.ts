import { tabsAtom, tabIdAtom } from 'renderer/states/tabs';
import { atom } from 'jotai';
import { isEmpty, get as _get, find } from 'lodash';
import { getProjects } from 'renderer/api';
import { Project, ResponseData } from './types';

const projectAtom = atom<ResponseData<Project[]>>({ loading: false, data: [] });
export const projectIdAtom = atom<string>('');

export const fetchProjectAtom = atom<ResponseData<Project[]>, undefined>(
  (get) => get(projectAtom),
  async (get, set) => {
    const projects = get(projectAtom);
    if (isEmpty(projects.data)) {
      set(projectAtom, { loading: true, data: [] });
      const data = await getProjects();

      // intial global states
      set(projectIdAtom, _get(data, '0.id', ''));
      set(tabsAtom, [_get(data, '0.collections.0', {})]);
      set(tabIdAtom, _get(data, '0.collections.0.id', ''));
      set(projectAtom, { loading: false, data: data || [] });
    }
  }
);

export const projectNameAtom = atom<string>((get) =>
  _get(find(get(projectAtom).data, { id: get(projectIdAtom) }), 'project', '')
);

export default projectAtom;
