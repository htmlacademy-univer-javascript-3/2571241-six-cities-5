import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  getNearbyOffers,
  getReviews,
  getSingleOffer,
  getSingleOfferDataLoadingStatus,
} from '../../../store/single-offer-data-process/single-offer-data-process.selectors';
import { Header } from '../main-page/header';
import CommentForm from './comment-form';
import { ReviewList } from './review-list';
import { useEffect } from 'react';
import { fetchSingleOfferAction } from '../../../store/api-actions';
import { OfferGallery } from './offer-gallery';
import { LoadingScreen } from '../loading-page/loading-page';
import { getAuthCheckedStatus } from '../../../store/user-process/user-process.selectors';
import { Map } from '../../map/map';
import OffersList from '../main-page/offers-list';
import { CardClass } from '../../../consts';

function OfferPage(): JSX.Element {
  const offerId = useParams<{ id: string }>().id as string;
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchSingleOfferAction({ offerId }));
  }, [offerId, dispatch]);

  const reviews = useAppSelector(getReviews);
  const currentOffer = useAppSelector(getSingleOffer);
  const isDataStillLoading = useAppSelector(getSingleOfferDataLoadingStatus);
  const isAuthorized = useAppSelector(getAuthCheckedStatus);
  const nearbyOffers = useAppSelector(getNearbyOffers);
  if (!currentOffer || isDataStillLoading) {
    return <LoadingScreen />;
  }

  const currentOfferPoint = {
    location: currentOffer.location,
    id: currentOffer.id,
  };

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--offer">
        <section className="offer">
          <OfferGallery />
          <div className="offer__container container">
            <div className="offer__wrapper">
              {currentOffer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{currentOffer.title}</h1>
                <button
                  className={`offer__bookmark-button${
                    currentOffer.isFavorite ? '--active' : ''
                  } button`}
                  type="button"
                >
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  {currentOffer.isFavorite ? (
                    <span className="visually-hidden">In bookmarks</span>
                  ) : (
                    <span className="visually-hidden">To bookmarks</span>
                  )}
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span
                    style={{
                      width: `${Math.round(currentOffer.rating) * 20}%`,
                    }}
                  >
                  </span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">
                  {currentOffer.rating}
                </span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {String(currentOffer.type).charAt(0).toUpperCase() +
                    String(currentOffer.type).slice(1)}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {`${currentOffer.bedrooms} Bedroom${
                    currentOffer.bedrooms > 1 ? 's' : ''
                  }`}
                </li>
                <li className="offer__feature offer__feature--adults">
                  {`Max ${currentOffer.maxAdults} Adult${
                    currentOffer.maxAdults > 1 ? 's' : ''
                  }`}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">€{currentOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {currentOffer.goods.map((good) => (
                    <li className="offer__inside-item" key={`good-${good}`}>
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="offer__avatar user__avatar"
                      src={currentOffer.host.avatarUrl}
                      width={74}
                      height={74}
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">
                    {currentOffer.host.name}
                  </span>
                  {currentOffer.host.isPro && (
                    <span className="offer__user-status">Pro</span>
                  )}
                </div>
                <div className="offer__description">
                  <p className="offer__text">{currentOffer.description}</p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">
                  Reviews ·{' '}
                  <span className="reviews__amount">{reviews.length}</span>
                </h2>
                <ReviewList reviews={reviews} />
                {isAuthorized && <CommentForm currentOfferId={currentOffer.id} />}
              </section>
            </div>
          </div>
          <Map
            city={currentOffer.city}
            points={nearbyOffers
              .map((offer) => ({
                location: offer.location,
                id: offer.id,
              }))
              .concat(currentOfferPoint)}
            selectedPoint={currentOfferPoint}
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <OffersList
              offers={nearbyOffers}
              onActiveOfferChange={() => {}}
              cardClass={CardClass.Nearby}
              wrapperClassName={'near-places__list places__list'}
            />
          </section>
        </div>
      </main>
    </div>
  );
}
export default OfferPage;
