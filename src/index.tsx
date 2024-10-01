import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Settings } from './consts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App rentalOffersCount={Settings.rentalOffersCount} />
  </React.StrictMode>
);
