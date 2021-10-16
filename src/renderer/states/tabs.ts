import { atom, WritableAtom } from 'jotai';
import { Collection } from 'renderer/states/types';
import { find, remove } from 'lodash';

export const tabsAtom = atom<Collection[]>([]);
export const tabIdAtom = atom(-1);

export const addTabAtom = atom<Collection[], Collection>(
  (get) => get(tabsAtom),
  (get, set, collection) => {
    const collections = get(tabsAtom);
    const foundCollection = find(collections, { id: collection.id });
    if (!foundCollection) {
      const newTabs = collections.concat(collection);
      set(tabsAtom as WritableAtom<Collection[], Collection[]>, newTabs);
    }
  }
);

export const deleteTabAtom = atom<Collection[], Collection>(
  (get) => get(tabsAtom),
  (get, set, collection) => {
    const collections = get(tabsAtom);
    const foundCollection = find(collections, { id: collection.id });
    if (foundCollection) {
      const newTabs = remove(collections, { id: collection.id });
      set(tabsAtom, newTabs);
    }
  }
);
