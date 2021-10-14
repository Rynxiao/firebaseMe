import React from 'react';
import Sidebar from 'renderer/components/sidebar/Sidebar';
import { Grid } from '@material-ui/core';
import HeaderTabs from 'renderer/components/Contents/HeaderTabs';

const Layout = () => (
  <Grid container sx={{ height: '100%' }}>
    <Grid item xs={2} sx={{ borderRight: 1, borderColor: 'divider' }}>
      <Sidebar />
    </Grid>
    <Grid item xs={10}>
      <HeaderTabs />
    </Grid>
  </Grid>
);

export default Layout;
