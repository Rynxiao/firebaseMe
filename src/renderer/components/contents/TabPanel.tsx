import Box from '@material-ui/core/Box';
import * as React from 'react';

interface TabPanelProps {
  children?: React.ReactNode;
  tabId: number;
  selectedTabId: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, selectedTabId, tabId, ...other } = props;

  return (
    <Box
      sx={{ width: '100%', height: '100%', overflowY: 'auto' }}
      role="tabpanel"
      hidden={selectedTabId !== tabId}
      id={`simple-tabpanel-${tabId}`}
      aria-labelledby={`simple-tab-${tabId}`}
      {...other}
    >
      {selectedTabId === tabId && <Box sx={{ p: 3 }}>{children}</Box>}
    </Box>
  );
};

export default TabPanel;
