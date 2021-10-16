import {
  ListSubheader,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
} from '@material-ui/core';
import React, { useEffect } from 'react';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collections from '@material-ui/icons/Collections';
import ListIcon from '@material-ui/icons/List';
import { useAtom } from 'jotai';
import projectAtom from 'renderer/states/projects';
import { get } from 'lodash';
import { addTabAtom, tabIdAtom } from 'renderer/states/tabs';
import { Collection } from 'renderer/states/types';

const Sidebar = () => {
  const [projects] = useAtom(projectAtom);
  const [, addTab] = useAtom(addTabAtom);
  const [, setTabId] = useAtom(tabIdAtom);
  const [projectId, setProjectId] = React.useState(get(projects, '0.id'));
  const [collectionId, setCollectionId] = React.useState(
    get(projects, '0.collections.0.id')
  );

  useEffect(() => {
    const initialCollection = get(projects, '0.collections.0');
    addTab(initialCollection);
    setTabId(initialCollection.id);
  }, [addTab, projects, setTabId]);

  const handleClickCollection = (collection: Collection) => {
    setCollectionId(collection.id);
    addTab(collection);
    setTabId(collection.id);
  };

  return (
    <List
      sx={{ width: '100%', bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Projects
        </ListSubheader>
      }
    >
      {projects.map((project) => {
        const { collections } = project;
        return (
          <Box component="div" key={project.id}>
            <ListItemButton onClick={() => setProjectId(project.id)}>
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary={project.project} />
              {projectId === project.id ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse
              in={projectId === project.id}
              timeout="auto"
              unmountOnExit
            >
              {collections.map((collection) => (
                <List component="div" disablePadding key={collection.id}>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    selected={collectionId === collection.id}
                    onClick={() =>
                      handleClickCollection(collection as unknown as Collection)
                    }
                  >
                    <ListItemIcon>
                      <Collections />
                    </ListItemIcon>
                    <ListItemText primary={collection.name} />
                  </ListItemButton>
                </List>
              ))}
            </Collapse>
          </Box>
        );
      })}
    </List>
  );
};

export default Sidebar;
