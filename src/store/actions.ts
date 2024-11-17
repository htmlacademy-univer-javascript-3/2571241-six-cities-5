import { createAction } from '@reduxjs/toolkit';
import { City } from '../types/city';
import { Offer } from '../types/offer';

export const changeCityAction = createAction<City>('ChangeCity');
export const fillCityOffersList = createAction<Offer[]>('FillCityOfferList');
