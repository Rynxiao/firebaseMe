import { atom } from 'jotai';
import { getProjects } from '../../../server/api';
import { Project } from './types';

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

const projectAtom = atom<Project[]>([]);

export const fetchProjectAtom = atom<Project[], undefined>(
  (get) => get(projectAtom),
  async (_get, set) => {
    const response = await getProjects();
    const projects = response.data.data;
    set(projectAtom, projects);
  }
);

export default projectAtom;
