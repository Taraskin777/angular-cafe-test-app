import { createAction, props } from '@ngrx/store';
import { Dishes } from '../shared/interfaces/dishes';

export const currentDishes = createAction(
  '[DISHES] Set Current Dishes',
  props<{ dishes: Dishes[] }>()
);
export const foundedDishes = createAction(
  '[DISHES] Set Founded Dishes',
  props<{ dishName: string, dishes?:Dishes[] }>()
);

export const clearFoundedDishes = createAction('[DISHES] Clear Founded Dishes');

