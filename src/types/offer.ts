import { City } from './city';
import { Location } from './location';

export type Offer = {
  id: string;
  title: string;
  type: 'apartment' | 'room' | 'hotel' | 'house';
  price: number;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
};
