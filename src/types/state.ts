import { AuthorizationStatus, CityName } from '../consts';
import { store } from '../store';
import { Offer } from './offer';
import { ReviewData } from './review-data';
import { SingleOffer } from './single-offer';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
};
export type DataProcess = {
  cityName: CityName;
  offerList: Offer[];
  isOffersDataLoading: boolean;
};

export type SingleOfferProcess = {
  singleOffer: SingleOffer | null;
  nearbyOffers: Offer[];
  reviews: ReviewData[];
  isSingleOfferDataLoading: boolean;
  isReviewPosting: boolean;
  isFormAccepted: boolean;
};
