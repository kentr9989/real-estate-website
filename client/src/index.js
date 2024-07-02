import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux/store';
import { Provider } from 'react-redux';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MantineProvider>
    </PersistGate>
  </Provider>
);
