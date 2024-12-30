import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SingleOffer } from '../../types/single-offer';
import { StoreNameSpace } from '../../consts';
import { SingleOfferProcess as SingleOfferDataProcess } from '../../types/state';
import { Offer } from '../../types/offer';
import { ReviewFromPerson } from '../../types/review-data';
import {
  fetchNearbyOffersAction,
  fetchReviewsAction,
  fetchSingleOfferAction,
} from '../api-actions';

const initialState: SingleOfferDataProcess = {
  singleOffer: null,
  nearbyOffers: [],
  reviews: [],
  isSingleOfferDataLoading: false,
  isReviewPosting: false,
  isFormAccepted: false,
};

export const singleOfferDataProcess = createSlice({
  name: StoreNameSpace.SingleOffer,
  initialState,
  reducers: {
    setSingleOffer: (state, action: PayloadAction<{ offer: SingleOffer }>) => {
      state.singleOffer = action.payload.offer;
    },
    setNearbyOffers: (
      state,
      action: PayloadAction<{ nearbyOffers: Offer[] }>
    ) => {
      state.nearbyOffers = action.payload.nearbyOffers;
    },
    setReviews: (
      state,
      action: PayloadAction<{ reviews: ReviewFromPerson[] }>
    ) => {
      state.reviews = action.payload.reviews;
    },
    setSingleOfferDataLoadingStatus: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.isSingleOfferDataLoading = action.payload;
    },
    sendReview: (state, action: PayloadAction<ReviewFromPerson>) => {
      state.reviews.push(action.payload);
    },
    setFormAcceptedStatus: (state, action: PayloadAction<boolean>) => {
      state.isFormAccepted = action.payload;
    },
    updateFavoritesNearbyInfo: (
      state,
      action: PayloadAction<{ offerToUpdate: Offer }>
    ) => {
      const { offerToUpdate } = action.payload;
      const offerIndex = state.nearbyOffers.findIndex(
        (offer) => offer.id === offerToUpdate.id
      );
      if (offerIndex !== -1) {
        state.nearbyOffers[offerIndex] = offerToUpdate;
      }
    },
    updateSingleOfferFavoritesStatus: (state) => {
      if (state.singleOffer !== null) {
        state.singleOffer.isFavorite = !state.singleOffer?.isFavorite;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.fulfilled, (state) => {
        state.isSingleOfferDataLoading = false;
      })
      .addCase(fetchReviewsAction.rejected, (state) => {
        state.isSingleOfferDataLoading = false;
      })
      .addCase(fetchReviewsAction.pending, (state) => {
        state.isSingleOfferDataLoading = true;
      })
      .addCase(fetchNearbyOffersAction.fulfilled, (state) => {
        state.isSingleOfferDataLoading = false;
      })
      .addCase(fetchNearbyOffersAction.rejected, (state) => {
        state.isSingleOfferDataLoading = false;
      })
      .addCase(fetchNearbyOffersAction.pending, (state) => {
        state.isSingleOfferDataLoading = true;
      })
      .addCase(fetchSingleOfferAction.fulfilled, (state) => {
        state.isSingleOfferDataLoading = false;
      })
      .addCase(fetchSingleOfferAction.rejected, (state) => {
        state.isSingleOfferDataLoading = false;
      })
      .addCase(fetchSingleOfferAction.pending, (state) => {
        state.isSingleOfferDataLoading = true;
      });
  },
});

export const {
  setSingleOffer,
  setNearbyOffers,
  setReviews,
  sendReview,
  setSingleOfferDataLoadingStatus,
  setFormAcceptedStatus,
  updateFavoritesNearbyInfo,
  updateSingleOfferFavoritesStatus,
} = singleOfferDataProcess.actions;
