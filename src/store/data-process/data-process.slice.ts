import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CityName, StoreNameSpace } from '../../consts';
import { DataProcess } from '../../types/state';
import { fetchOffersAction } from '../api-actions';
import { City } from '../../types/city';
import { Offer } from '../../types/offer';

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
    updateFavoriteInfo(state, action: PayloadAction<{ offerToUpdate: Offer }>) {
      const { offerToUpdate } = action.payload;
      const offerIndex = state.offerList.findIndex(
        (offer) => offer.id === offerToUpdate.id
      );
      if (offerIndex !== -1) {
        state.offerList[offerIndex] = offerToUpdate;
      }
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
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isOffersDataLoading = false;
      });
  },
});

export const { changeCityAction, updateFavoriteInfo } = offersData.actions;
