import * as React from 'react';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import { Button, Grid, Paper } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { getCollection } from 'renderer/firebase';
import { User } from 'renderer/states/types';

export interface SearchFormProps {
  defaultValue: string;
}

const SearchFrom = (props: SearchFormProps) => {
  const { defaultValue } = props;
  const pathRef = React.useRef(null);
  const [data, setData] = React.useState<User[]>([]);

  const handleSearch = async () => {
    if (pathRef.current) {
      const pathInput = (pathRef.current as HTMLDivElement).querySelector(
        '#path'
      ) as HTMLInputElement;

      if (pathInput) {
        const path = pathInput.value;
        console.log(path);
        const users = await getCollection<User>('user');
        setData(users);
      }
    }
  };

  console.log('data', data);

  return (
    <Paper>
      <Box sx={{ maxWidth: '100%' }}>
        <Grid container>
          <Grid item xs={10}>
            <TextField
              ref={pathRef}
              id="path"
              fullWidth
              label="Path"
              size="small"
              margin="dense"
              defaultValue={defaultValue}
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
