import { Link } from 'react-router-dom';
import { Offer } from '../../../types/offer';
import { AppRoutes, CardClass } from '../../../consts';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { getAuthCheckedStatus } from '../../../store/user-process/user-process.selectors';
import { redirectToRoute } from '../../../store/actions';
import { editFavoritesAction } from '../../../store/api-actions';

type OfferCardProps = {
  offer: Offer;
  cardClass: CardClass;
};

function OfferCard({ offer, cardClass }: OfferCardProps): JSX.Element {
  const highestRating = 5;
  const isAuth = useAppSelector(getAuthCheckedStatus);
  const dispatch = useAppDispatch();
  const handleBookmarkClick = () => {
    if(!isAuth) {
      dispatch(redirectToRoute(AppRoutes.Login))
    } else {
      dispatch(editFavoritesAction({offerId: offer.id, isFavoriteNow: offer.isFavorite}));
    }
  }
  return (
    <article className="cities__card place-card">
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${offer.id}`}>
          <img
            className="place-card__image"
            src={offer.previewImage}
            width={cardClass === CardClass.Favorites ? 150 : 260}
            height={cardClass === CardClass.Favorites ? 110 : 200}
            alt="Place image"
          />
        </Link>
      </div>
      <div
        className={`${
          cardClass === CardClass.Favorites ? 'favorites__card-info' : ''
        } place-card__info`}
      >
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{offer.price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button
            className={
              offer.isFavorite
                ? 'place-card__bookmark-button place-card__bookmark-button--active button'
                : 'place-card__bookmark-button button'
            }
            type="button"
            onClick={handleBookmarkClick}
          >
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">
              {offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}
            </span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span
              style={{
                width: `${(offer.rating / highestRating) * 100}%`,
              }}
            />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

export default OfferCard;
