import { useState } from 'react';
import { Map } from '../../map/map';
import { Offer } from '../../../types/offer';
import OffersList from './offers-list';
import { Nullable } from 'vitest';
import CitiesList from './cities-list';
import { useAppSelector } from '../../../store/hooks';
import { CityData } from '../../../consts';
import { Header } from './header';
import { getCurrentCityName, getOffers } from '../../../store/data-process/data-process.selectors';

function MainPage(): JSX.Element {
  const [activeOffer, setActiveOffer] = useState<Nullable<Offer>>(null);
  const activeCityName = useAppSelector(getCurrentCityName);
  const offers = useAppSelector(getOffers).filter(
    (offer) => offer.city.name === activeCityName
  );
  return (
    <div className="page page--gray page--main">
      <Header/>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CitiesList />
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {offers.length} places to stay in {activeCityName}
              </b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width={7} height={4}>
                    <use xlinkHref="#icon-arrow-select" />
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li
                    className="places__option places__option--active"
                    tabIndex={0}
                  >
                    Popular
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Price: low to high
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Price: high to low
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Top rated first
                  </li>
                </ul>
              </form>
              <OffersList
                offers={offers}
                onActiveOfferChange={(offer: Nullable<Offer>) =>
                  setActiveOffer(offer)}
              />
            </section>
            <div className="cities__right-section">
              <Map
                city={CityData[activeCityName]}
                points={offers.map((x) => ({
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
        </div>
      </main>
    </div>
  );
}

export default MainPage;
