import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fillCityOffersList, setOffersDataLoadingStatus } from './actions';
import { Offer } from '../types/offer';
import { AppDispatch, State } from '../types/state';
import { APIRoutes } from '../consts';

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
