import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Grid, Paper } from '@mui/material';
import TelegramIcon from '@mui/icons-material/Telegram';

export interface SearchFormProps {
  defaultPath: string;
  onSearch: (path: string) => void;
}

const SearchFrom = (props: SearchFormProps) => {
  const { defaultPath: defaultValue, onSearch } = props;
  const [path, setPath] = React.useState(defaultValue);

  const handlePathChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPath(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.keyCode === 13) {
      onSearch(path);
    }
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
              onKeyDown={handleKeyDown}
            />
          </Grid>
          <Grid item xs={2}>
            <Box
              component="div"
              sx={{
                width: 1,
                height: 1,
                display: 'flex',
                alignItems: 'center',
                ml: 1,
              }}
            >
              <Button
                variant="contained"
                endIcon={<TelegramIcon />}
                onClick={() => onSearch(path)}
              >
                Go
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default SearchFrom;
