import { useCallback, useState } from 'react';
import { Entity, ResponseData } from 'renderer/states/types';
import { getDocuments } from '../api/index';

const INITIAL_RESPONSE: ResponseData<Entity[]> = { loading: false, data: [] };

const useFetchCollection = () => {
  const [response, setResponse] =
    useState<ResponseData<Entity[]>>(INITIAL_RESPONSE);

  const fetchCollection = useCallback(
    async (collectionPath: string, projectId: string) => {
      setResponse({ loading: true, data: [] });
      const res = await getDocuments(collectionPath, projectId);
      if (res) {
        setResponse({ loading: false, data: res });
      }
    },
    []
  );

  return { response, fetchCollection };
};

export default useFetchCollection;
