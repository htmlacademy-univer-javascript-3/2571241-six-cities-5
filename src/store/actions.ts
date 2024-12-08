import { createAction } from '@reduxjs/toolkit';
import { City } from '../types/city';
import { Offer } from '../types/offer';
import { AuthorizationStatus } from '../consts';

export const changeCityAction = createAction<City>('ChangeCity');
export const fillCityOffersList = createAction<Offer[]>('FillCityOfferList');
export const setOffersDataLoadingStatus = createAction<boolean>(
  'SetOffersDataLoadingStatus'
);
export const changeAuthStatus = createAction<AuthorizationStatus>('changeAuthStatus');
export const redirectToRoute = createAction<string>('engine/redirectToRoute');
