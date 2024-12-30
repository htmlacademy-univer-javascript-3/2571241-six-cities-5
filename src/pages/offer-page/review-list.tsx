import { ReviewFromPerson } from '../../types/review-data';
import { Review } from './review';

type ReviewListProps = {
  reviews: ReviewFromPerson[];
};

export function ReviewList({ reviews }: ReviewListProps): JSX.Element {
  const sortedReviews = [...reviews]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);

  return (
    <ul className="reviews__list">
      {sortedReviews.map((review) => (
        <Review key={review.id} review={review} />
      ))}
    </ul>
  );
}
