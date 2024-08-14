import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { PersistGate } from 'redux-persist/lib/integration/react';

import { Provider } from 'react-redux';
import { Store , persistor } from './context/Store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={Store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </PersistGate>
  </Provider>
);
