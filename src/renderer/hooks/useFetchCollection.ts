import { useCallback, useState } from 'react';
import { Entity, ResponseData } from 'renderer/states/types';
import { formatPath, isCollectionPath } from 'renderer/utils/format';
import { getDocuments, getDocument } from '../api/index';

const INITIAL_RESPONSE: ResponseData<Entity[]> = { loading: false, data: [] };

const useFetchCollection = () => {
  const [response, setResponse] =
    useState<ResponseData<Entity[]>>(INITIAL_RESPONSE);

  const fetchCollection = useCallback(
    async (path: string, projectId: string) => {
      setResponse({ loading: true, data: [] });

      const formattedPath = formatPath(path);
      const shouldFetchDocs = isCollectionPath(path);
      let res: Entity[] | null = null;

      if (shouldFetchDocs) {
        res = await getDocuments(formattedPath, projectId);
      } else {
        const doc = await getDocument(formattedPath, projectId);
        res = doc ? [doc] : doc;
      }

      if (res) {
        setResponse({ loading: false, data: res });
      }
    },
    []
  );

  return { response, fetchCollection };
};

export default useFetchCollection;
