import * as React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import TabPanel from 'renderer/components/Contents/TabPanel';
import { useAtom } from 'jotai';
import { tabIdAtom, tabsAtom } from 'renderer/states/tabs';

const a11yProps = (id: number) => ({
  id: `simple-tab-${id}`,
  'aria-controls': `simple-tabpanel-${id}`,
});

const HeaderTabs = () => {
  const [tabs] = useAtom(tabsAtom);
  const [tabId, setTabId] = useAtom(tabIdAtom);

  const handleChange = (id: number) => {
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
          aria-label="basic tabs example"
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              label={tab.name}
              value={tab.id}
              {...a11yProps(tab.id)}
            />
          ))}
        </Tabs>
      </Box>
      <Box>
        {tabs.map((tab) => (
          <TabPanel value={tabId} index={tab.id}>
            Item {tab.name}
          </TabPanel>
        ))}
      </Box>
    </Box>
  );
};

export default HeaderTabs;
