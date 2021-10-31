import Button from '@mui/material/Button';
import green from '@mui/material/colors/green';
import Fab from '@mui/material/Fab';
import Box from '@mui/system/Box';
import CheckIcon from '@mui/icons-material/Check';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import GoogleIcon from '@mui/icons-material/Google';
import React, { useEffect, useState } from 'react';
import {
  getAccessToken,
  getLoginClickedStatus,
  login,
  onLoginResult,
  setLoginClickedStatus,
} from 'renderer/firebase/auth';
import CircularProgress from '@mui/material/CircularProgress';
import { grey } from '@mui/material/colors';

const Login = () => {
  const [loading, setLoading] = useState(true);
  const [userLogged, setUserLogged] = useState(false);
  const [clicked, setClicked] = useState(false);

  const buttonSx = {
    ...(userLogged && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700],
      },
    }),
  };

  useEffect(() => {
    setUserLogged(!!getAccessToken());
  }, []);

  useEffect(() => {
    const isLoginClicked = getLoginClickedStatus() === 'true';
    setClicked(isLoginClicked);
  }, []);

  useEffect(() => {
    const waitForLoginResult = async () => {
      const token = await onLoginResult();

      if (token) {
        setUserLogged(true);
        setLoginClickedStatus('false');
        setClicked(false);
        setLoading(false);
      }
    };

    if (!userLogged) {
      waitForLoginResult();
    }
  }, [userLogged]);

  const handleLogin = async () => {
    setLoginClickedStatus('true');
    setClicked(true);
    await login();
  };

  return (
    <Box
      sx={{
        width: 1,
        height: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: grey['300'],
      }}
    >
      {!userLogged && !clicked ? (
        <Box component="div">
          <>
            <h1>Sign In With Google</h1>
            <Button
              variant="contained"
              startIcon={<GoogleIcon />}
              onClick={handleLogin}
            >
              Login
            </Button>
          </>
        </Box>
      ) : (
        <>
          {!userLogged && loading ? (
            <Box component="div" sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ m: 1, position: 'relative' }}>
                <Fab color="primary" sx={buttonSx}>
                  <LocalFireDepartmentIcon />
                </Fab>
                <CircularProgress
                  size={68}
                  sx={{
                    color: green[500],
                    position: 'absolute',
                    top: -6,
                    left: -6,
                    zIndex: 1,
                  }}
                />
              </Box>
              <Box sx={{ m: 1, position: 'relative' }}>
                <Button variant="contained" sx={buttonSx} disabled>
                  Initializing App
                </Button>
                <CircularProgress
                  size={24}
                  sx={{
                    color: green[500],
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-12px',
                    marginLeft: '-12px',
                  }}
                />
              </Box>
            </Box>
          ) : (
            <Box component="div" sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ m: 1, position: 'relative' }}>
                <Fab color="primary" sx={buttonSx}>
                  <CheckIcon />
                </Fab>
              </Box>
              <Box sx={{ m: 1, position: 'relative' }}>
                <Button variant="contained" sx={buttonSx}>
                  Initializing App
                </Button>
              </Box>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default Login;
