import { useAppSelector } from '../../../store/hooks';
import { getSingleOffer } from '../../../store/single-offer-data-process/single-offer-data-process.selectors';

export function OfferGallery(): JSX.Element {
  const images = (useAppSelector(getSingleOffer)?.images as string[])?.slice(0, 6);
  return (
    <div className="offer__gallery">
      {images?.map((image) => (
        <div className="offer__image-wrapper" key={`image-${image}`}>
          <img className="offer__image" src={image} alt="Photo studio" />
        </div>
      ))}
    </div>
  );
}
