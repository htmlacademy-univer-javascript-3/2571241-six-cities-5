import { useState } from 'react';
import { Map } from '../../components/map/map';
import { Offer } from '../../types/offer';
import { Nullable } from 'vitest';
import { useAppSelector } from '../../store/hooks';
import { CardClass, CITY_DATA, SortingOption } from '../../consts';
import {
  getCurrentCityName,
  getOffers,
} from '../../store/data-process/data-process.selectors';
import SortingDropdown from './sorting-dropdown';
import MainPageEmpty from './main-page-empty';
import Header from './header';
import CitiesList from './cities-list';
import OffersList from '../../components/offers-list';

function MainPage(): JSX.Element {
  const [activeOffer, setActiveOffer] = useState<Nullable<Offer>>(null);
  const [currentSort, setCurrentSort] = useState<SortingOption>(
    SortingOption.Popular
  );
  const activeCityName = useAppSelector(getCurrentCityName);
  const offers = useAppSelector(getOffers).filter(
    (offer) => offer.city.name === activeCityName
  );

  const getSortedOffers = () => {
    const sorted = [...offers];
    switch (currentSort) {
      case SortingOption.PriceLowToHigh:
        sorted.sort((a, b) => a.price - b.price);
        break;
      case SortingOption.PriceHighToLow:
        sorted.sort((a, b) => b.price - a.price);
        break;
      case SortingOption.TopRatedFirst:
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    return sorted;
  };
  const sortedOffers = getSortedOffers();
  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CitiesList />
        <div className="cities">
          {sortedOffers.length > 0 ? (
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">
                  {offers.length} places to stay in {activeCityName}
                </b>
                <SortingDropdown onSortChange={setCurrentSort} />
                <OffersList
                  offers={sortedOffers}
                  onActiveOfferChange={(offer: Nullable<Offer>) =>
                    setActiveOffer(offer)
                  }
                  cardClass={CardClass.Cities}
                  wrapperClassName={
                    'cities__places-list places__list tabs__content'
                  }
                />
              </section>
              <div className="cities__right-section">
                <Map
                  city={CITY_DATA[activeCityName]}
                  points={sortedOffers.map((x) => ({
                    location: x.location,
                    id: x.id,
                  }))}
                  selectedPoint={
                    activeOffer
                      ? {
                          location: activeOffer.location,
                          id: activeOffer.id,
                        }
                      : undefined
                  }
                />
              </div>
            </div>
          ) : (
            <MainPageEmpty />
          )}
        </div>
      </main>
    </div>
  );
}

export default MainPage;
