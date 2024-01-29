import { Dishes } from './dishes';

export interface Categories {
  id: number;
  name: string;
  image: string;
  dishes: Dishes[];
}
