import { createRoot } from 'react-dom/client';
import App from './App.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';
import "react-toastify/dist/ReactToastify.css";

import store, { persistor } from './store.jsx'; // 👈 import persistor
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'; // 👈 import PersistGate

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
