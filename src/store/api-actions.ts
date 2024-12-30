import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { redirectToRoute } from './actions';
import { Offer } from '../types/offer';
import { AppDispatch, State } from '../types/state';
import { APIRoutes, AppRoutes, CityData, CityName } from '../consts';
import { AuthInfo } from '../types/authInfo';
import { dropToken, saveToken } from '../services/token';
import { UserInfo } from '../types/userInfo';
import { SingleOffer } from '../types/single-offer';
import { ReviewData, ReviewFromPerson } from '../types/review-data';
import {
  setNearbyOffers,
  setReviews,
  setSingleOffer,
  updateFavoritesNearbyInfo,
} from './single-offer-data-process/single-offer-data-process.slice';
import {
  setFavoriteOffers,
  setUserData,
  updateUserFavorites,
} from './user-process/user-process.slice';
import { changeCityAction, updateFavoriteInfo } from './data-process/data-process.slice';

export const fetchOffersAction = createAsyncThunk<
  Offer[],
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchOffers', async (_arg, { extra: api }) => {
  const { data } = await api.get<Offer[]>(APIRoutes.Offers);
  return data;
});

export const fetchReviewsAction = createAsyncThunk<
  void,
  { offerId: string },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchReviews', async ({ offerId }, { dispatch, extra: api }) => {
  const { data } = await api.get<ReviewFromPerson[]>(
    `${APIRoutes.Comments}/${offerId}`
  );
  dispatch(setReviews({ reviews: data }));
});

export const postReviewAction = createAsyncThunk<
  void,
  ReviewData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'review/postReview',
  async ({ comment, rating, id }, { dispatch, extra: api }) => {
    const parsedRating = Number(rating);
    await api.post(`${APIRoutes.Comments}/${id}`, {
      comment,
      rating: parsedRating,
    });
    dispatch(fetchReviewsAction({ offerId: id }));
  }
);

export const fetchNearbyOffersAction = createAsyncThunk<
  void,
  { offerId: string },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchNearbyOffers', async ({ offerId }, { dispatch, extra: api }) => {
  const { data } = await api.get<Offer[]>(
    `${APIRoutes.Offers}/${offerId}/nearby`
  );
  dispatch(setNearbyOffers({ nearbyOffers: data.slice(0, 3) }));
});

export const fetchSingleOfferAction = createAsyncThunk<
  void,
  { offerId: string },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchSingleOffer', async ({ offerId }, { dispatch, extra: api }) => {
  const { data } = await api.get<SingleOffer>(`${APIRoutes.Offers}/${offerId}`);
  dispatch(fetchReviewsAction({ offerId }));
  dispatch(fetchNearbyOffersAction({ offerId }));
  dispatch(setSingleOffer({ offer: data }));
});

export const fetchFavoriteOffersAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchFavoriteOffers', async (_arg, { dispatch, extra: api }) => {
  const { data } = await api.get<Offer[]>(APIRoutes.Favorites);
  dispatch(setFavoriteOffers(data));
});

export const editFavoritesAction = createAsyncThunk<
  void,
  { offerId: string; isFavoriteNow: boolean },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'user/editFavorites',
  async ({ offerId, isFavoriteNow }, { dispatch, extra: api }) => {
    const { data } = await api.post<Offer & SingleOffer>(
      `${APIRoutes.Favorites}/${offerId}/${isFavoriteNow ? 0 : 1}`
    );
    dispatch(updateUserFavorites({ editedOffer: data }));
    dispatch(updateFavoriteInfo({ offerToUpdate: data }));
    dispatch(updateFavoritesNearbyInfo({ offerToUpdate: data }));
  }
);

export const checkAuthAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/checkAuth', async (_arg, { dispatch, extra: api }) => {
  const { data } = await api.get<UserInfo>(APIRoutes.Login);
  dispatch(fetchFavoriteOffersAction());
  dispatch(setUserData(data));
});

export const loginAction = createAsyncThunk<
  void,
  AuthInfo,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/login', async (payload, { dispatch, extra: api }) => {
  const { data } = await api.post<UserInfo>(APIRoutes.Login, payload);
  saveToken(data.token);
  dispatch(redirectToRoute(AppRoutes.Root));
  dispatch(setUserData(data));
  dispatch(fetchFavoriteOffersAction());
  dispatch(fetchOffersAction());
});

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/logout', async (_arg, { dispatch, extra: api }) => {
  await api.delete(APIRoutes.Logout);
  dropToken();
  dispatch(fetchOffersAction());
  dispatch(setUserData(null));
  dispatch(changeCityAction(CityData[CityName.Paris]))
  dispatch(redirectToRoute(AppRoutes.Root));
});
