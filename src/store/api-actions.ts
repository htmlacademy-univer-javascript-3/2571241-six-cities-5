import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { redirectToRoute } from './actions';
import { Offer } from '../types/offer';
import { AppDispatch, State } from '../types/state';
import { APIRoutes, AppRoutes } from '../consts';
import { AuthInfo } from '../types/authInfo';
import { dropToken, saveToken } from '../components/services/token';
import { UserInfo } from '../types/userInfo';
import { SingleOffer } from '../types/single-offer';
import { ReviewData } from '../types/review-data';
import { setNearbyOffers, setReviews, setSingleOffer } from './single-offer-data-process/single-offer-data-process.slice';

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

export const fetchReviewsAction = createAsyncThunk<void, { offerId: string }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchReviews',
  async ({offerId}, {dispatch, extra: api}) => {
    const {data} = await api.get<ReviewData[]>(`${APIRoutes.Comments}/${offerId}`);
    dispatch(setReviews({reviews: data}));
  },
);

export const fetchNearbyOffersAction = createAsyncThunk<void, {offerId: string}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchNearbyOffers',
  async ({offerId}, {dispatch, extra: api}) => {
    const {data} = await api.get<Offer[]>(`${APIRoutes.Offers}/${offerId}/nearby`);
    dispatch(setNearbyOffers({nearbyOffers: data.slice(0, 3)}));
  },
);

export const fetchSingleOfferAction = createAsyncThunk<void, { offerId: string }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchSingleOffer',
  async ({offerId}, {dispatch, extra: api}) => {
    const {data} = await api.get<SingleOffer>(`${APIRoutes.Offers}/${offerId}`);
    dispatch(fetchReviewsAction({offerId}));
    dispatch(fetchNearbyOffersAction({offerId}));
    dispatch(setSingleOffer({offer: data}));
  },
);

export const checkAuthAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/checkAuth', async (_arg, { extra: api }) => {
  await api.get(APIRoutes.Login);
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
  const {
    data: { token },
  } = await api.post<UserInfo>(APIRoutes.Login, payload);
  saveToken(token);
  dispatch(redirectToRoute(AppRoutes.Root));
});

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/logout', async (_arg, { extra: api }) => {
  await api.delete(APIRoutes.Logout);
  dropToken();
});
