import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import { redirectMiddleware as redirectMiddleware } from './middlewares/redirectMiddleware';
import { rootReducer } from './root-reducer';

const api = createAPI();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirectMiddleware),
});
