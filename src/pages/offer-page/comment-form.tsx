import { FormEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setFormAcceptedStatus } from '../../store/single-offer-data-process/single-offer-data-process.slice';
import { postReviewAction } from '../../store/api-actions';
import {
  getSingleOfferFormAcceptedStatus,
  getSingleOfferReviewPostingStatus,
} from '../../store/single-offer-data-process/single-offer-data-process.selectors';

type CommentFormProps = {
  currentOfferId: string;
};

function CommentForm({ currentOfferId }: CommentFormProps): JSX.Element {
  const [formState, setFormState] = useState({ rating: 0, review: '' });
  const [isFormValid, setIsFormValid] = useState(false);
  const isFormAccepted = useAppSelector(getSingleOfferFormAcceptedStatus);
  const isPosting = useAppSelector(getSingleOfferReviewPostingStatus);
  const dispatch = useAppDispatch();
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };
  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(
      postReviewAction({
        comment: formState.review,
        rating: formState.rating,
        id: currentOfferId,
      })
    );

    if (isFormAccepted) {
      setFormState({
        review: '',
        rating: 0,
      });
      dispatch(setFormAcceptedStatus(false));
    }
  };

  useEffect(() => {
    if (
      formState.review.length > 50 &&
      formState.review.length < 301 &&
      formState.rating !== 0
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [formState]);

  return (
    <form
      className="reviews__form form"
      onSubmit={handleSubmit}
      aria-disabled={!isPosting}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          id="5-stars"
          type="radio"
          onChange={handleChange}
          value={5}
        />
        <label
          htmlFor="5-stars"
          className="reviews__rating-label form__rating-label"
          title="perfect"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          id="4-stars"
          type="radio"
          onChange={handleChange}
          value={4}
        />
        <label
          htmlFor="4-stars"
          className="reviews__rating-label form__rating-label"
          title="good"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          id="3-stars"
          type="radio"
          onChange={handleChange}
          value={3}
        />
        <label
          htmlFor="3-stars"
          className="reviews__rating-label form__rating-label"
          title="not bad"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          id="2-stars"
          type="radio"
          onChange={handleChange}
          value={2}
        />
        <label
          htmlFor="2-stars"
          className="reviews__rating-label form__rating-label"
          title="badly"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          id="1-star"
          type="radio"
          onChange={handleChange}
          value={1}
        />
        <label
          htmlFor="1-star"
          className="reviews__rating-label form__rating-label"
          title="terribly"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formState.review}
        onChange={handleChange}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isFormValid}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default CommentForm;
