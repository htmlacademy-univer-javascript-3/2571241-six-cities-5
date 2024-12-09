import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CityName, StoreNameSpace } from '../../consts';
import { DataProcess } from '../../types/state';
import { fetchOffersAction } from '../api-actions';

export const initialState: DataProcess = {
  cityName: CityName.Paris,
  offerList: [],
  isOffersDataLoading: false,
};

export const offersData = createSlice({
  name: StoreNameSpace.Data,
  initialState,
  reducers: {
    changeCityAction: (
      state,
      action: PayloadAction<{ cityName: CityName }>
    ) => {
      const { cityName } = action.payload;
      state.cityName = cityName;
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
      });
  },
});

export const { changeCityAction } = offersData.actions;
