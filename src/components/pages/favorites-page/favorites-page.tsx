import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { getFavoriteOffers } from '../../../store/user-process/user-process.selectors';
import OffersList from '../main-page/offers-list';
import { AppRoutes, CardClass, CITY_INFO } from '../../../consts';
import { Link } from 'react-router-dom';
import { City } from '../../../types/city';
import { changeCityAction } from '../../../store/data-process/data-process.slice';
import { redirectToRoute } from '../../../store/actions';
import FavoritesEmptyPage from './favorites-empty-page';
import { LoadingScreen } from '../loading-page/loading-page';
import Header from '../main-page/header';

function FavoritesPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(getFavoriteOffers);
  const handleCityClick = (city: City) => (event: React.MouseEvent) => {
    event.preventDefault();
    dispatch(changeCityAction(city));
    dispatch(redirectToRoute(AppRoutes.Root));
  };
  if (!favorites) {
    return <LoadingScreen />;
  }
  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          {favorites.length > 0 ? (
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {CITY_INFO.map((city) => {
                  const cityFavorites = favorites.filter(
                    (favorite) => favorite.city.name === city.name
                  );
                  return (
                    cityFavorites.length > 0 && (
                      <li
                        key={city.name}
                        className="favorites__locations-items"
                      >
                        <div className="favorites__locations locations locations--current">
                          <div className="locations__item">
                            <Link
                              className="locations__item-link"
                              onClick={handleCityClick(city)}
                              to={AppRoutes.Root}
                            >
                              <span>{city.name}</span>
                            </Link>
                          </div>
                        </div>
                        <OffersList
                          offers={cityFavorites}
                          onActiveOfferChange={() => {}}
                          cardClass={CardClass.Favorites}
                          wrapperClassName="favorites__places"
                        />
                      </li>
                    )
                  );
                })}
              </ul>
            </section>
          ) : (
            <FavoritesEmptyPage />
          )}
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width={64}
            height={33}
          />
        </a>
      </footer>
    </div>
  );
}

export default FavoritesPage;
