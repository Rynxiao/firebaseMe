import * as React from 'react';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import { Button, Grid, Paper } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import useFetchCollection from 'renderer/hooks/useFetchCollection';

export interface SearchFormProps {
  defaultValue: string;
}

const SearchFrom = (props: SearchFormProps) => {
  const { defaultValue } = props;
  const [path, setPath] = React.useState(defaultValue);
  const fetchCollection = useFetchCollection(path);

  const handlePathChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPath(event.target.value);
  };

  const handleSearch = async () => {
    await fetchCollection();
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
