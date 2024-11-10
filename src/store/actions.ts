import { createAction } from "@reduxjs/toolkit";
import { City } from "../types/city";
import { CityOfferList } from "../types/city-offer-list";

export const changeCityAction = createAction<City>('ChangeCity');
export const fillCityOffersList = createAction<CityOfferList>("FillCityOfferList");
