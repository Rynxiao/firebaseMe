import * as React from 'react';
import Box from '@mui/material/Box';
import useFetchCollection from 'renderer/hooks/useFetchCollection';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { generateGridColumns } from 'renderer/utils/grid';
import { Collection } from 'renderer/states/types';
import useSidebar from 'renderer/hooks/useSidebar';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import SearchFrom from './SearchForm';

interface TabPanelProps {
  tab: Collection;
  selectedTabId: string;
}

const TabPanel = (props: TabPanelProps) => {
  const { selectedTabId, tab } = props;
  const { response, fetchCollection } = useFetchCollection();
  const { loading } = useSidebar();

  const handleFormSearch = async (searchPath: string) => {
    await fetchCollection(searchPath, '123');
  };

  const columns = generateGridColumns(response.data);
  console.log(response.data);
  console.log('columns', columns);

  return (
    <Box
      sx={{ width: '100%', height: '100%', overflowY: 'auto' }}
      role="tabpanel"
      hidden={selectedTabId !== tab.id}
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
          <Typography sx={{ mt: 0.25 }}>Loading Contents</Typography>
        </Box>
      ) : (
        <Box sx={{ p: 3 }}>
          <SearchFrom defaultPath={tab.name} onSearch={handleFormSearch} />
          <Box sx={{ height: 400, width: 1, mt: 3 }}>
            <DataGrid
              rows={response.data}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              disableSelectionOnClick
              components={{
                Toolbar: GridToolbar,
              }}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default TabPanel;
