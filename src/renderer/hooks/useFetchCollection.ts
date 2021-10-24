import { useAtom } from 'jotai';
import { useCallback } from 'react';
import { getCollection } from 'renderer/firebase';
import { addEntityListAtom } from 'renderer/states/entities';
import { toast } from 'react-toastify';
import { Entity } from 'renderer/states/types';

const useFetchCollection = (collectionName: string) => {
  const [, addEntityList] = useAtom(addEntityListAtom);

  const fetchCollection = useCallback(() => {
    addEntityList({ key: collectionName, data: { loading: true, data: [] } });
    return getCollection<Entity>(collectionName).then((response) => {
      if (response.error) {
        toast.error(response.error);
        return response;
      }
      addEntityList({ key: collectionName, data: response });
      return response;
    });
  }, [addEntityList, collectionName]);

  return fetchCollection;
};

export default useFetchCollection;
