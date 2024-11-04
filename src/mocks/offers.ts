import { Offer } from '../types/offer';

export const offersMock: Offer[] = [
  {
    id: '123b14bf-0e76-4007-a9aa-8845fc67cca6',
    title: 'Canal View Prinsengracht',
    type: 'apartment',
    price: 204,
    previewImage: 'https://14.design.htmlacademy.pro/static/hotel/7.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13,
      },
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: false,
    rating: 1.8,
  },
  {
    id: '23000b45-8a03-4202-8a70-69ceb0c00f98',
    title: 'The house among olive ',
    type: 'house',
    price: 245,
    previewImage: 'https://14.design.htmlacademy.pro/static/hotel/20.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13,
      },
    },
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: true,
    rating: 1.4,
  },
  {
    id: 'ffcdf66f-71c1-4712-9e1e-6ee8bc07404f',
    title: 'Waterfront with extraordinary view',
    type: 'hotel',
    price: 418,
    previewImage: 'https://14.design.htmlacademy.pro/static/hotel/18.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13,
      },
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: false,
    rating: 4.1,
  },
  {
    id: 'f7fb9836-48e3-4139-8663-56f493d34175',
    title: 'Beautiful & luxurious apartment at great location',
    type: 'hotel',
    price: 221,
    previewImage: 'https://14.design.htmlacademy.pro/static/hotel/17.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13,
      },
    },
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: false,
    rating: 3.6,
  },
];
