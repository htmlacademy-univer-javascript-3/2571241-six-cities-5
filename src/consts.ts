import { City } from './types/city';

export enum AppRoutes {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum CityName {
  Paris = 'Paris',
  Amsterdam = 'Amsterdam',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf',
}

export const CITY_INFO: City[] = [
  {
    name: CityName.Paris,
    location: {
      latitude: 48.8534,
      longitude: 2.3488,
      zoom: 12,
    },
  },
  {
    name: CityName.Cologne,
    location: {
      latitude: 50.9333,
      longitude: 6.95,
      zoom: 12,
    },
  },
  {
    name: CityName.Brussels,
    location: {
      latitude: 50.8504,
      longitude: 4.34878,
      zoom: 12,
    },
  },
  {
    name: CityName.Amsterdam,
    location: {
      latitude: 52.374,
      longitude: 4.889969,
      zoom: 12,
    },
  },
  {
    name: CityName.Hamburg,
    location: {
      latitude: 53.5511,
      longitude: 9.9937,
      zoom: 12,
    },
  },
  {
    name: CityName.Dusseldorf,
    location: {
      latitude: 51.2217,
      longitude: 6.77616,
      zoom: 12,
    },
  },
];

export const CityData = {
  [CityName.Paris]: {
    name: CityName.Paris,
    location: {
      latitude: 48.8534,
      longitude: 2.3488,
      zoom: 12,
    },
  },
  [CityName.Cologne]: {
    name: CityName.Cologne,
    location: {
      latitude: 50.9333,
      longitude: 6.95,
      zoom: 12,
    },
  },
  [CityName.Brussels]: {
    name: CityName.Brussels,
    location: {
      latitude: 50.8504,
      longitude: 4.34878,
      zoom: 12,
    },
  },
  [CityName.Amsterdam]: {
    name: CityName.Amsterdam,
    location: {
      latitude: 52.374,
      longitude: 4.889969,
      zoom: 12,
    },
  },
  [CityName.Hamburg]: {
    name: CityName.Hamburg,
    location: {
      latitude: 53.5511,
      longitude: 9.9937,
      zoom: 12,
    },
  },
  [CityName.Dusseldorf]: {
    name: CityName.Dusseldorf,
    location: {
      latitude: 51.2217,
      longitude: 6.77616,
      zoom: 12,
    },
  },
};
