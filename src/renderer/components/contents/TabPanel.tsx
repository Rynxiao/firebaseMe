import * as React from 'react';
import Box from '@mui/material/Box';
import useFetchCollection from 'renderer/hooks/useFetchCollection';
import { DataGrid, GridEditRowsModel, GridToolbar } from '@mui/x-data-grid';
import { generateGridColumns } from 'renderer/utils/grid';
import { Collection } from 'renderer/states/types';
import { useAtom } from 'jotai';
import { projectNameAtom } from 'renderer/states/projects';
import SearchFrom from './SearchForm';

interface TabPanelProps {
  tab: Collection;
  selectedTabId: string;
}

const TabPanel = (props: TabPanelProps) => {
  const { selectedTabId, tab } = props;
  const { response, fetchCollection } = useFetchCollection();
  const [projectName] = useAtom(projectNameAtom);

  const handleFormSearch = async (searchPath: string) => {
    await fetchCollection(searchPath, projectName);
  };

  const columns = React.useMemo(
    () => generateGridColumns(response.data),
    [response.data]
  );

  const handleEditRowsModelChange = React.useCallback(
    (model: GridEditRowsModel) => {
      console.log(model);
    },
    []
  );

  return (
    <Box
      sx={{ width: '100%', height: '100%', overflowY: 'auto' }}
      role="tabpanel"
      hidden={selectedTabId !== tab.id}
    >
      <Box sx={{ p: 3 }}>
        <SearchFrom defaultPath={tab.name} onSearch={handleFormSearch} />
        <Box sx={{ height: 400, width: 1, mt: 3 }}>
          <DataGrid
            rows={response.data}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[20]}
            components={{
              Toolbar: GridToolbar,
            }}
            onEditRowsModelChange={handleEditRowsModelChange}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default TabPanel;
