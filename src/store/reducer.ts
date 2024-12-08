import { createReducer } from '@reduxjs/toolkit';
import {
  changeCityAction,
  fillCityOffersList,
  setOffersDataLoadingStatus,
} from './actions';
import { CityName } from '../consts';
import { Offer } from '../types/offer';

export const InitialCityState = {
  cityName: CityName.Paris,
  offerList: [] as Offer[],
  isOffersDataLoading: false,
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
    });
});
