import { AuthorizationStatus, CityName } from '../consts';
import { store } from '../store';
import { Offer } from './offer';
import { ReviewFromPerson } from './review-data';
import { SingleOffer } from './single-offer';
import { UserInfo } from './userInfo';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  user: UserInfo | null;
  isUserDataStillLoading: boolean;
  favoriteOffers: Offer[];
};
export type DataProcess = {
  cityName: CityName;
  offerList: Offer[];
  isOffersDataLoading: boolean;
};

export type SingleOfferProcess = {
  singleOffer: SingleOffer | null;
  nearbyOffers: Offer[];
  reviews: ReviewFromPerson[];
  isSingleOfferDataLoading: boolean;
  isReviewPosting: boolean;
  isFormAccepted: boolean;
};
