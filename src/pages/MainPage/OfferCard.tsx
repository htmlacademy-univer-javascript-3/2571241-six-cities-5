type OfferCardProps = {
  priceEUR: number;
  isInBookmarks: boolean;
  isPremium: boolean;
  ratingPercents: number;
  cardType: string;
  cardName: string;
  imgPath: string;
};

function OfferCard(props: OfferCardProps): JSX.Element {
  return (
    <article className="cities__card place-card">
      {props.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img
            className="place-card__image"
            src={props.imgPath}
            width={260}
            height={200}
            alt="Place image"
          />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{props.priceEUR}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button
            className={
              props.isInBookmarks
                ? 'place-card__bookmark-button place-card__bookmark-button--active button'
                : 'place-card__bookmark-button button'
            }
            type="button"
          >
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">
              {props.isInBookmarks ? 'In bookmarks' : 'To bookmarks'}
            </span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span
              style={{
                width:`${props.ratingPercents}%`,
              }}
            />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">{props.cardName}</a>
        </h2>
        <p className="place-card__type">{props.cardType}</p>
      </div>
    </article>
  );
}

export default OfferCard;
