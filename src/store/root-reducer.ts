import { combineReducers } from '@reduxjs/toolkit';
import { StoreNameSpace } from '../consts';
import { offersData } from './data-process/data-process.slice';
import { userProcess } from './user-process/user-process.slice';
import { singleOfferData } from './single-offer-data-process/single-offer-data-process.slice';

export const rootReducer = combineReducers({
  [StoreNameSpace.Data]: offersData.reducer,
  [StoreNameSpace.User]: userProcess.reducer,
  [StoreNameSpace.SingleOffer]: singleOfferData.reducer,
});
