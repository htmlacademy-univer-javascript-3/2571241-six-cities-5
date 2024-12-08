import { PayloadAction } from '@reduxjs/toolkit';
import { Middleware } from 'redux';
import { reducer } from '../reducer';
import browserHistory from '../../browser-history';

type Reducer = ReturnType<typeof reducer>;

export const redirectMiddleware: Middleware<unknown, Reducer> =
  () => (next) => (action: PayloadAction<string>) => {
    if (action.type === 'engine/redirectToRoute') {
      browserHistory.push(action.payload);
    }

    return next(action);
  };
