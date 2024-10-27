import { useEffect, useState } from 'react';
import { Offer } from '../../types/offer';
import OfferCard from './OfferCard';

function OffersList(props: { offers: Offer[] }): JSX.Element {
  const { offers } = props;
  const [activeOffer, setActiveOffer] = useState<string | null>(null);

  useEffect(() => {
    console.log(activeOffer);
  }, [activeOffer]);
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <div
          key={offer.id}
          onMouseEnter={() => setActiveOffer(offer.id)}
          onMouseLeave={() => setActiveOffer(null)}
        >
          <OfferCard {...offer} />
        </div>
      ))}
    </div>
  );
}

export default OffersList;
