import { useAtom } from 'jotai';
import { get } from 'lodash';
import React, { useEffect, useState } from 'react';
import { fetchProjectAtom } from 'renderer/states/projects';
import { addTabAtom, tabIdAtom } from 'renderer/states/tabs';

const useSidebar = () => {
  const [projects, fetchProjects] = useAtom(fetchProjectAtom);
  const [, addTab] = useAtom(addTabAtom);
  const [, setTabId] = useAtom(tabIdAtom);
  const [projectId, setProjectId] = useState(get(projects, '0.id'));
  const [collectionId, setCollectionId] = useState(
    get(projects, '0.collections.0.id')
  );
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  useEffect(() => {
    const initialCollection = get(projects, '0.collections.0');

    if (initialCollection) {
      addTab(initialCollection);
      setTabId(initialCollection.id);
    }
  }, [addTab, projects, setTabId]);

  return {
    projects,
    projectId,
    collectionId,
    open,
    addTab,
    setTabId,
    setProjectId,
    setCollectionId,
    setOpen,
  };
};

export default useSidebar;
