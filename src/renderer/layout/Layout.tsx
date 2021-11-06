import React from 'react';
import Sidebar from 'renderer/components/sidebar/Sidebar';
import { Grid } from '@mui/material';
import HeaderTabs from 'renderer/components/contents/HeaderTabs';

const Layout = () => (
  <Grid container sx={{ height: 1 }}>
    <Grid item xs={3} sx={{ borderRight: 1, borderColor: 'divider' }}>
      <Sidebar />
    </Grid>
    <Grid item xs={9}>
      <HeaderTabs />
    </Grid>
  </Grid>
);

export default Layout;
