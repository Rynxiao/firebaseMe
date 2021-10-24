import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabPanel from 'renderer/components/contents/TabPanel';
import { useAtom } from 'jotai';
import { tabIdAtom, tabsAtom } from 'renderer/states/tabs';
import useFetchCollection from 'renderer/hooks/useFetchCollection';
import SearchFrom from './SearchForm';

const a11yProps = (id: number) => ({
  id: `simple-tab-${id}`,
  'aria-controls': `simple-tabpanel-${id}`,
});

const HeaderTabs = () => {
  const [tabs] = useAtom(tabsAtom);
  const [tabId, setTabId] = useAtom(tabIdAtom);
  const { response, fetchCollection } = useFetchCollection();

  const handleChange = (id: number) => {
    setTabId(id);
  };

  const handleFormSearch = async (searchPath: string) => {
    await fetchCollection(searchPath);
  };

  console.log(response);

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
            <TabPanel selectedTabId={tabId} tabId={tab.id}>
              <SearchFrom defaultPath={tab.name} onSearch={handleFormSearch} />
            </TabPanel>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default HeaderTabs;
