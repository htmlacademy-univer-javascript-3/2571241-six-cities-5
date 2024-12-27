import { Person } from './person';

export type ReviewData = {
  id: string;
  comment: string;
  rating: number;
  date: string;
  user: Person | null;
};
