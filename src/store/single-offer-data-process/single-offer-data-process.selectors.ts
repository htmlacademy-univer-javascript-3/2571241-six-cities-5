import { StoreNameSpace } from '../../consts';
import { Offer } from '../../types/offer';
import { ReviewData } from '../../types/review-data';
import { SingleOffer } from '../../types/single-offer';
import { State } from '../../types/state';

export const getSingleOffer = (state: State): SingleOffer | null =>
  state[StoreNameSpace.SingleOffer].singleOffer;
export const getNearbyOffers = (state: State): Offer[] =>
  state[StoreNameSpace.SingleOffer].nearbyOffers;
export const getReviews = (state: State): ReviewData[] =>
  state[StoreNameSpace.SingleOffer].reviews;
export const getSingleOfferDataLoadingStatus = (state: State): boolean =>
  state[StoreNameSpace.SingleOffer].isSingleOfferDataLoading;
export const getSingleOfferFormAcceptedStatus = (state: State): boolean =>
  state[StoreNameSpace.SingleOffer].isFormAccepted;
export const getSingleOfferReviewPostingStatus = (state: State): boolean =>
  state[StoreNameSpace.SingleOffer].isReviewPosting;
