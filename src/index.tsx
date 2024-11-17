import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/app';
import { OffersMock } from './mocks/offers';
import { Provider } from 'react-redux';
import { store } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App offers={OffersMock} />
    </Provider>
  </React.StrictMode>
);
