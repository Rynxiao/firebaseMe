import * as React from 'react';
import './App.global.css';
import Routes from 'renderer/routes/Routes';
import { CssBaseline } from '@material-ui/core';
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
