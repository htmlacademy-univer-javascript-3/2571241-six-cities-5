import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  changeAuthStatus,
  fillCityOffersList,
  redirectToRoute,
  setOffersDataLoadingStatus,
} from './actions';
import { Offer } from '../types/offer';
import { AppDispatch, State } from '../types/state';
import { APIRoutes, AppRoutes, AuthorizationStatus } from '../consts';
import { AuthInfo } from '../types/authInfo';
import { dropToken, saveToken } from '../components/services/token';
import { UserInfo } from '../types/userInfo';

export const fetchOffersAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchOffers', async (_arg, { dispatch, extra: api }) => {
  dispatch(setOffersDataLoadingStatus(true));
  const { data } = await api.get<Offer[]>(APIRoutes.Offers);
  dispatch(setOffersDataLoadingStatus(false));
  dispatch(fillCityOffersList(data));
});

export const checkAuthAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/checkAuth', async (_arg, { dispatch, extra: api }) => {
  try {
    await api.get(APIRoutes.Login);
    dispatch(changeAuthStatus(AuthorizationStatus.Auth));
  } catch {
    dispatch(changeAuthStatus(AuthorizationStatus.NoAuth));
  }
});

export const loginAction = createAsyncThunk<
  void,
  AuthInfo,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/login', async (payload, { dispatch, extra: api }) => {
  const {
    data: { token },
  } = await api.post<UserInfo>(APIRoutes.Login, payload);
  saveToken(token);
  dispatch(changeAuthStatus(AuthorizationStatus.Auth));
  dispatch(redirectToRoute(AppRoutes.Root));
});

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/logout', async (_arg, { dispatch, extra: api }) => {
  await api.delete(APIRoutes.Logout);
  dropToken();
  dispatch(changeAuthStatus(AuthorizationStatus.NoAuth));
  dispatch(redirectToRoute(AppRoutes.Root));
});
