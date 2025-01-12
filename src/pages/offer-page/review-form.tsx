import { FormEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setFormAcceptedStatus } from '../../store/single-offer-data-process/single-offer-data-process.slice';
import { postReviewAction } from '../../store/api-actions';
import {
  getSingleOfferFormAcceptedStatus,
  getSingleOfferReviewPostingStatus,
} from '../../store/single-offer-data-process/single-offer-data-process.selectors';
import { RatingDescriptionsList } from '../../consts';
import React from 'react';

type ReviewFormProps = {
  currentOfferId: string;
};

function ReviewForm({ currentOfferId }: ReviewFormProps): JSX.Element {
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
  };

  useEffect(() => {
    if (isFormAccepted) {
      setFormState({
        review: '',
        rating: 0,
      });
      dispatch(setFormAcceptedStatus(false));
    }
  }, [isFormAccepted, dispatch]);

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
        {[5, 4, 3, 2, 1].map((i) => (
          <React.Fragment key={i}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              id={`${i}-stars`}
              type="radio"
              onChange={handleChange}
              value={`${i}`}
              checked={formState.rating.toString() === `${i}`}
            />
            <label
              htmlFor={`${i}-stars`}
              className="reviews__rating-label form__rating-label"
              title={RatingDescriptionsList[i + 1]}
            >
              <svg className="form__star-image" width={37} height={33}>
                <use xlinkHref="#icon-star" />
              </svg>
            </label>
          </React.Fragment>
        ))}
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
          disabled={!isFormValid || isPosting}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
