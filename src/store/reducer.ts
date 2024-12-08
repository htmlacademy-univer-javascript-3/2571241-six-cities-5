import { createReducer } from '@reduxjs/toolkit';
import {
  changeAuthStatus,
  changeCityAction,
  fillCityOffersList,
  setOffersDataLoadingStatus,
} from './actions';
import { AuthorizationStatus, CityName } from '../consts';
import { Offer } from '../types/offer';

export const InitialCityState = {
  cityName: CityName.Paris,
  offerList: [] as Offer[],
  isOffersDataLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
};

export const reducer = createReducer(InitialCityState, (builder) => {
  builder
    .addCase(changeCityAction, (state, action) => {
      const city = action.payload;
      state.cityName = city.name;
    })
    .addCase(fillCityOffersList, (state, action) => {
      const cityOfferList = action.payload;
      state.offerList = cityOfferList;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(changeAuthStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});
