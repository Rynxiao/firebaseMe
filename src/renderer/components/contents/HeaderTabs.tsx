import * as React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import TabPanel from 'renderer/components/contents/TabPanel';
import { useAtom } from 'jotai';
import { tabIdAtom, tabsAtom } from 'renderer/states/tabs';
import SearchFrom from './SearchForm';

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
          scrollButtons="auto"
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
          <Box component="div" key={tab.id}>
            <TabPanel value={tabId} index={tab.id}>
              <SearchFrom defaultValue={tab.name} />
            </TabPanel>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default HeaderTabs;
