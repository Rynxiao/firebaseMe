import { projectNameAtom } from './../states/projects';
import { useAtom } from 'jotai';
import React, { useEffect } from 'react';
import { fetchProjectAtom, projectIdAtom } from 'renderer/states/projects';
import { addTabAtom, tabIdAtom } from 'renderer/states/tabs';

const useSidebar = () => {
  const [projectsResponse, fetchProjects] = useAtom(fetchProjectAtom);
  const projects = projectsResponse.data;
  const { loading } = projectsResponse;

  const [, addTab] = useAtom(addTabAtom);
  const [tabId, setTabId] = useAtom(tabIdAtom);
  const [projectId, setProjectId] = useAtom(projectIdAtom);
  const [projectName] = useAtom(projectNameAtom);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return {
    projects,
    loading,
    projectId,
    projectName,
    open,
    tabId,
    addTab,
    setTabId,
    setProjectId,
    setOpen,
  };
};

export default useSidebar;
