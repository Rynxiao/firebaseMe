import * as React from 'react';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import { Button, Grid, Paper } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { getCollection } from 'renderer/firebase';
import { Entity } from 'renderer/states/types';
import { useAtom } from 'jotai';
import { addEntityListAtom } from 'renderer/states/entities';
import { toast } from 'react-toastify';

export interface SearchFormProps {
  defaultValue: string;
}

const SearchFrom = (props: SearchFormProps) => {
  const { defaultValue } = props;
  const [path, setPath] = React.useState(defaultValue);
  const [, addEntityList] = useAtom(addEntityListAtom);

  const handlePathChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPath(event.target.value);
  };

  const handleSearch = async () => {
    const { error, data } = await getCollection<Entity>(path);
    if (error) {
      toast.error(error);
      return;
    }
    addEntityList({ key: path, list: data });
  };

  return (
    <Paper>
      <Box sx={{ maxWidth: '100%' }}>
        <Grid container>
          <Grid item xs={10}>
            <TextField
              fullWidth
              label="Path"
              size="small"
              margin="dense"
              value={path}
              onChange={handlePathChange}
            />
          </Grid>
          <Grid item xs={1}>
            <Box
              component="div"
              sx={{
                width: 1,
                height: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Button
                variant="contained"
                endIcon={<SearchIcon />}
                onClick={handleSearch}
              >
                Search
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default SearchFrom;
