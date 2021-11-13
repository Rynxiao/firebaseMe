import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabPanel from 'renderer/components/contents/TabPanel';
import { useAtom } from 'jotai';
import { tabsAtom } from 'renderer/states/tabs';
import useSidebar from 'renderer/hooks/useSidebar';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

const HeaderTabs = () => {
  const [tabs] = useAtom(tabsAtom);
  const { loading, tabId, setTabId } = useSidebar();

  const handleChange = (id: string) => {
    setTabId(id);
  };

  if (loading) {
    return (
      <Box
        sx={{
          width: 1,
          height: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress size={20} />
        <Typography sx={{ mt: 0.25 }}>Loading Contents</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: 1,
        height: 1,
        display: 'grid',
        gridAutoRows: '49px 1fr',
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={tabId}
          onChange={(_event, id) => handleChange(id)}
          scrollButtons="auto"
        >
          {tabs.map((tab) => (
            <Tab key={tab.id} label={tab.name} value={tab.id} />
          ))}
        </Tabs>
      </Box>
      <Box>
        {tabs.map((tab) => (
          <Box component="div" key={tab.id}>
            <TabPanel selectedTabId={tabId} tab={tab} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default HeaderTabs;
