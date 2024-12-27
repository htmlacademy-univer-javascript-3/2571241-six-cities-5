import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CityName, StoreNameSpace } from '../../consts';
import { DataProcess } from '../../types/state';
import { fetchOffersAction } from '../api-actions';
import { City } from '../../types/city';

export const initialState: DataProcess = {
  cityName: CityName.Paris,
  offerList: [],
  isOffersDataLoading: false,
};

export const offersData = createSlice({
  name: StoreNameSpace.Data,
  initialState,
  reducers: {
    changeCityAction: (state, action: PayloadAction<City>) => {
      const city = action.payload;
      state.cityName = city.name;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersDataLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offerList = action.payload;
        state.isOffersDataLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state, action) => {
        state.isOffersDataLoading = false
      });
  },
});

export const { changeCityAction } = offersData.actions;
