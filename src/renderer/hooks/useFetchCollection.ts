import { useCallback, useState } from 'react';
import { getCollection } from 'renderer/firebase';
import { toast } from 'react-toastify';
import { Entity, ResponseData } from 'renderer/states/types';

const INITIAL_RESPONSE: ResponseData<Entity[]> = { loading: false, data: [] };

const useFetchCollection = () => {
  const [response, setResponse] =
    useState<ResponseData<Entity[]>>(INITIAL_RESPONSE);

  const fetchCollection = useCallback((collectionName: string) => {
    setResponse({ loading: true, data: [] });
    return getCollection<Entity>(collectionName).then((res) => {
      if (res.error) {
        toast.error(res.error);
        return res;
      }
      setResponse(res);
      return res;
    });
  }, []);

  return { response, fetchCollection };
};

export default useFetchCollection;
