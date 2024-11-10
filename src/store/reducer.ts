import { createReducer } from "@reduxjs/toolkit";
import { offersMock } from "../mocks/offers";
import { changeCityAction, fillCityOffersList } from "./actions";

export const InitialCityState = {
    city: "Paris",
    offerList: offersMock.filter((o) => o.city.name === "Paris"),
}

export const reducer = createReducer(InitialCityState, (builder) => {
    builder.addCase(changeCityAction, (state, action) => {
        const city = action.payload;
        state.city = city.name;
    })
    .addCase(fillCityOffersList, (state, action) => {
        const cityOfferList = action.payload;
        state.offerList = cityOfferList.offers;
    })
})