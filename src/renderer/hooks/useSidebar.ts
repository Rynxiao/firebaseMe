import { useAtom } from 'jotai';
import { get } from 'lodash';
import React, { useEffect, useState } from 'react';
import { fetchProjectAtom } from 'renderer/states/projects';
import { addTabAtom, tabIdAtom } from 'renderer/states/tabs';

const useSidebar = () => {
  const [projectsResponse, fetchProjects] = useAtom(fetchProjectAtom);
  const projects = projectsResponse.data;
  const { loading } = projectsResponse;

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
    const initialProject = get(projects, '0');
    const initialCollection = get(initialProject, 'collections.0');

    if (initialCollection) {
      setProjectId(initialProject.id);
      setCollectionId(initialCollection.id);

      addTab(initialCollection);
      setTabId(initialCollection.id);
    }
  }, [addTab, projects, setTabId]);

  return {
    projects,
    loading,
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
