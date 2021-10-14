import * as React from 'react';
import './App.global.css';
import Routes from 'renderer/routes/Routes';
import { CssBaseline } from '@material-ui/core';

export default function App() {
  return (
    <>
      <CssBaseline />
      <Routes />
    </>
  );
}
