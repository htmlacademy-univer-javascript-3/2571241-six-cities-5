import { AuthorizationStatus, StoreNameSpace } from '../../consts';
import { State } from '../../types/state';

export const getAuthorizationStatus = (state: State): AuthorizationStatus =>
  state[StoreNameSpace.User].authorizationStatus;
export const getAuthCheckedStatus = (state: State): boolean =>
  state[StoreNameSpace.User].authorizationStatus === AuthorizationStatus.Auth;
