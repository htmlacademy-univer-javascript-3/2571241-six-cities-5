import { Nullable } from 'vitest';
import { Offer } from '../../types/offer';
import OfferCard from './offer-card';
import { CardClass } from '../../consts';

type OfferListProps = {
  offers: Offer[];
  onActiveOfferChange: (offer: Nullable<Offer>) => void;
  cardClass: CardClass;
  wrapperClassName: string;
};

function OffersList({
  offers,
  onActiveOfferChange,
  cardClass,
  wrapperClassName,
}: OfferListProps): JSX.Element {
  return (
    <div className={wrapperClassName}>
      {offers.map((offer) => (
        <div
          key={offer.id}
          onMouseEnter={() => onActiveOfferChange(offer)}
          onMouseLeave={() => onActiveOfferChange(null)}
        >
          <OfferCard offer={offer} cardClass={cardClass} />
        </div>
      ))}
    </div>
  );
}

export default OffersList;
