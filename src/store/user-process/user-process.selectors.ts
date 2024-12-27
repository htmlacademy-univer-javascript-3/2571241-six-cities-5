import { AuthorizationStatus, StoreNameSpace } from '../../consts';
import { Offer } from '../../types/offer';
import { State } from '../../types/state';
import { UserInfo } from '../../types/userInfo';

export const getAuthorizationStatus = (state: State): AuthorizationStatus =>
  state[StoreNameSpace.User].authorizationStatus;
export const getAuthCheckedStatus = (state: State): boolean =>
  state[StoreNameSpace.User].authorizationStatus === AuthorizationStatus.Auth;
export const getUserData = (state: State): UserInfo | null =>
  state[StoreNameSpace.User].user;
export const getFavoriteOffers = (state: State): Offer[] =>
  state[StoreNameSpace.User].favoriteOffers;
export const getFavoriteOffersCount = (state: State): number =>
  state[StoreNameSpace.User].favoriteOffers.length;
