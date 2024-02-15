import { createAction, props } from '@ngrx/store';
import { Dishes } from '../shared/interfaces/dishes';

export const foundedDishes = createAction(
  '[DISHES] Set Founded Dishes',
  props<{ dishName: string; dishes?: Dishes[] }>()
);

export const clearFoundedDishes = createAction('[DISHES] Clear Founded Dishes');
