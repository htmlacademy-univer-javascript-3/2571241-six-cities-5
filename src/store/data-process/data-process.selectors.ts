import { CityName, StoreNameSpace } from '../../consts';
import { Offer } from '../../types/offer';
import { State } from '../../types/state';

export const getOffers = (state: State): Offer[] =>
  state[StoreNameSpace.Data].offerList;
export const isOffersDataStillLoading = (state: State): boolean =>
  state[StoreNameSpace.Data].isOffersDataLoading;
export const getCurrentCityName = (state: State): CityName =>
  state[StoreNameSpace.Data].cityName;
