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
import React from 'react';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collections from '@mui/icons-material/Collections';
import ListIcon from '@mui/icons-material/List';
import AddIcon from '@mui/icons-material/Add';
import { Collection } from 'renderer/states/types';
import useSidebar from 'renderer/hooks/useSidebar';
import UploadForm from './UploadForm';

const Sidebar = () => {
  const {
    open,
    setOpen,
    projects,
    setCollectionId,
    addTab,
    setTabId,
    projectId,
    setProjectId,
    collectionId,
  } = useSidebar();

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
                {collections &&
                  collections.map((collection) => (
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
