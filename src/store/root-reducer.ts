import { combineReducers } from '@reduxjs/toolkit';
import { StoreNameSpace } from '../consts';
import { dataProcess } from './data-process/data-process.slice';
import { userProcess } from './user-process/user-process.slice';
import { singleOfferDataProcess } from './single-offer-data-process/single-offer-data-process.slice';

export const rootReducer = combineReducers({
  [StoreNameSpace.Data]: dataProcess.reducer,
  [StoreNameSpace.User]: userProcess.reducer,
  [StoreNameSpace.SingleOffer]: singleOfferDataProcess.reducer,
});
