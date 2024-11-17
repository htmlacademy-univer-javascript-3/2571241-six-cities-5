import { createReducer } from '@reduxjs/toolkit';
import { OffersMock } from '../mocks/offers';
import { changeCityAction, fillCityOffersList } from './actions';
import { CityName } from '../consts';

export const InitialCityState = {
  cityName: CityName.Paris,
  offerList: OffersMock,
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
    });
});
