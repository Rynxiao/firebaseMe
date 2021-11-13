import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/system/Box';
import { GridOverlay } from '@mui/x-data-grid';
import React from 'react';

const TableLoadingOverlay = () => (
  <GridOverlay>
    <Box component="div" sx={{ position: 'absolute', top: 0, width: 1 }}>
      <LinearProgress />
    </Box>
  </GridOverlay>
);

export default TableLoadingOverlay;
