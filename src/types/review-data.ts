import { Person } from './person';

export type ReviewData = {
  id: string;
  comment: string;
  rating: number;
};

export type ReviewFromPerson = ReviewData & {
  date: string;
  user: Person;
}
