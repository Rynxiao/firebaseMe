import { atom } from 'jotai';
import { isEmpty } from 'lodash';
import { getProjects } from '../../../server/api';
import { Project, ResponseData } from './types';

// const mockedProjects = [
//   {
//     id: 1,
//     project: 'TestDev',
//     collections: [
//       {
//         id: 11,
//         name: 'bets',
//       },
//       {
//         id: 12,
//         name: 'games',
//       },
//       {
//         id: 13,
//         name: 'gameDetails',
//       },
//     ],
//   },
//   {
//     id: 2,
//     project: 'TestUat',
//     collections: [
//       {
//         id: 21,
//         name: 'bets',
//       },
//       {
//         id: 22,
//         name: 'games',
//       },
//       {
//         id: 23,
//         name: 'gameDetails',
//       },
//       {
//         id: 24,
//         name: 'standings',
//       },
//     ],
//   },
// ];

const projectAtom = atom<ResponseData<Project[]>>({ loading: false, data: [] });

export const fetchProjectAtom = atom<ResponseData<Project[]>, undefined>(
  (get) => get(projectAtom),
  async (get, set) => {
    const projects = get(projectAtom);
    if (isEmpty(projects.data)) {
      set(projectAtom, { loading: true, data: [] });
      const response = await getProjects();
      const projectsResponse = response.data.data;
      set(projectAtom, { loading: false, data: projectsResponse });
    }
  }
);

export default projectAtom;
