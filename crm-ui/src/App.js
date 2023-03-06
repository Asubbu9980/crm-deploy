import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';

import { myTheme } from 'src/theme';
import { LoaderProvider } from './context/LoaderContext';
import { AppContextProvider } from 'src/context/AppContext';
import 'src/scss/App.scss';
import AppRoots from './AppRoots';


function App() {

  return (
    <LoaderProvider>
      <ThemeProvider theme={myTheme}>
        <AppContextProvider>
          <ToastContainer theme="light" />
          <AppRoots />
        </AppContextProvider >
      </ThemeProvider>
    </LoaderProvider>
  );

}

export default App;
