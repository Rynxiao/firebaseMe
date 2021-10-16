import { atom } from 'jotai';

const projectAtom = atom([
  {
    id: 1,
    project: 'TestDev',
    collections: [
      {
        id: 11,
        name: 'bets',
      },
      {
        id: 12,
        name: 'games',
      },
      {
        id: 13,
        name: 'gameDetails',
      },
    ],
  },
  {
    id: 2,
    project: 'TestUat',
    collections: [
      {
        id: 21,
        name: 'bets',
      },
      {
        id: 22,
        name: 'games',
      },
      {
        id: 23,
        name: 'gameDetails',
      },
      {
        id: 24,
        name: 'standings',
      },
    ],
  },
]);

export default projectAtom;
