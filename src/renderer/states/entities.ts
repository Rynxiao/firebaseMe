import { atom } from 'jotai';
import produce from 'immer';
import { Entites, EntitiesItem } from './types';

export const entitiesMapAtom = atom<Entites>({});

export const addEntityListAtom = atom<Entites, EntitiesItem>(
  (get) => get(entitiesMapAtom),
  (get, set, entitiesItem) => {
    const entitiesMap = get(entitiesMapAtom);
    const { key, list } = entitiesItem;
    const newMap = produce(entitiesMap, (draft) => {
      draft[key] = list;
      return draft;
    });

    set(entitiesMapAtom, newMap);
  }
);
