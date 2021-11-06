import {
  ListSubheader,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
  Button,
  CircularProgress,
  Typography,
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
    loading,
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
        width: 1,
        height: 1,
      }}
    >
      <List
        sx={{
          width: 1,
          height: 1,
          display: 'grid',
          gridAutoRows: '49px 1fr 49px 0',
          bgcolor: 'background.paper',
        }}
        component="nav"
        subheader={
          <ListSubheader
            component="div"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            Projects
          </ListSubheader>
        }
      >
        {loading ? (
          <Box
            sx={{
              width: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              mt: 5,
            }}
          >
            <CircularProgress size={20} />
            <Typography sx={{ mt: 0.25 }}>Loading Projects</Typography>
          </Box>
        ) : (
          <>
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
                        <List
                          component="div"
                          disablePadding
                          key={collection.id}
                        >
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
          </>
        )}
      </List>
    </Box>
  );
};

export default Sidebar;
