import * as React from 'react';
import './App.global.css';
import Routes from 'renderer/routes/Routes';
import { CssBaseline } from '@mui/material';
import { ToastContainer } from 'react-toastify';

export default function App() {
  return (
    <>
      <CssBaseline />
      <ToastContainer theme="colored" position="bottom-right" />
      <Routes />
    </>
  );
}
