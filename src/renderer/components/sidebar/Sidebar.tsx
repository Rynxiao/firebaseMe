import {
  ListSubheader,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
  Button,
} from '@mui/material';
import React, { useEffect } from 'react';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collections from '@mui/icons-material/Collections';
import ListIcon from '@mui/icons-material/List';
import AddIcon from '@mui/icons-material/Add';
import { useAtom } from 'jotai';
import projectAtom from 'renderer/states/projects';
import { get } from 'lodash';
import { addTabAtom, tabIdAtom } from 'renderer/states/tabs';
import { Collection } from 'renderer/states/types';
import UploadForm from './UploadForm';

const Sidebar = () => {
  const [projects] = useAtom(projectAtom);
  const [, addTab] = useAtom(addTabAtom);
  const [, setTabId] = useAtom(tabIdAtom);
  const [projectId, setProjectId] = React.useState(get(projects, '0.id'));
  const [collectionId, setCollectionId] = React.useState(
    get(projects, '0.collections.0.id')
  );
  const [open, setOpen] = React.useState(true);

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
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'grid',
        gridAutoRows: '1fr 49px 0',
      }}
    >
      <List
        sx={{ width: '100%', bgcolor: 'background.paper' }}
        component="nav"
        subheader={<ListSubheader component="div">Projects</ListSubheader>}
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
                        handleClickCollection(
                          collection as unknown as Collection
                        )
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
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          borderTop: 1,
          borderColor: 'divider',
          px: 2,
        }}
      >
        <AddIcon />
        <Button variant="text" onClick={() => setOpen(true)}>
          New Project
        </Button>
      </Box>
      <UploadForm open={open} setOpen={setOpen} />
    </Box>
  );
};

export default Sidebar;
