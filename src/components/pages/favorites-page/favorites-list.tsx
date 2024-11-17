import { Offer } from '../../../types/offer';
import FavoritesCard from './favorites-card';

function FavoritesList(props: { offers: Offer[] }): JSX.Element {
  const { offers } = props;
  return (
    <>
      <ul className="favorites__list"></ul>
      <li className="favorites__locations-items">
        <div className="favorites__locations locations locations--current">
          <div className="locations__item">
            <a className="locations__item-link" href="#">
              <span>Cologne</span>
            </a>
          </div>
        </div>
        <div className="favorites__places">
          {offers.map((offer) => (
            <FavoritesCard offer={offer} key={offer.id} />
          ))}
        </div>
      </li>
    </>
  );
}

export default FavoritesList;
