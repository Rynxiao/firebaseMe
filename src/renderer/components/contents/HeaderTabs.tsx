import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabPanel from 'renderer/components/contents/TabPanel';
import { useAtom } from 'jotai';
import { tabIdAtom, tabsAtom } from 'renderer/states/tabs';

const HeaderTabs = () => {
  const [tabs] = useAtom(tabsAtom);
  const [tabId, setTabId] = useAtom(tabIdAtom);

  const handleChange = (id: string) => {
    setTabId(id);
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
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
