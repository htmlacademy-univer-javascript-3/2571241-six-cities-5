import { Offer } from '../../types/offer';
import OfferCard from './OfferCard';

function OffersList(props: { offers: Offer[] }): JSX.Element {
  const { offers } = props;
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <OfferCard {...offer} />
      ))}
    </div>
  );
}

export default OffersList;