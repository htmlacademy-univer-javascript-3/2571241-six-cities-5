import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus, StoreNameSpace } from '../../consts';
import { UserProcess } from '../../types/state';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
import { UserInfo } from '../../types/userInfo';
import { Offer } from '../../types/offer';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
  isUserDataStillLoading: false,
  favoriteOffers: []
};

export const userProcess = createSlice({
  name: StoreNameSpace.User,
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserInfo|null>) => {
      state.user = action.payload;
    },
    setFavoriteOffers: (state, action: PayloadAction<Offer[]>) => {
      state.favoriteOffers = action.payload
    }
  },
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  },
});

export const {setUserData, setFavoriteOffers} = userProcess.actions;
