import { createReducer, on, Action } from '@ngrx/store';
import * as DishesActions from './dishes.actions';
import { Dishes } from '../shared/interfaces/dishes';

export interface DishesState {
  foundedDishes?: Dishes[] | undefined;
}

const initialState: DishesState = {
  foundedDishes: [],
};

export const dishesReducer = createReducer(
  initialState,
  on(DishesActions.foundedDishes, (state, { dishes, dishName }) => ({
    ...state,
    foundedDishes: dishes,
  })),
  on(DishesActions.clearFoundedDishes, state => ({
    ...state,
    foundedDishes: [],
  }))
);

export function reducer(state: DishesState | undefined, action: Action) {
  return dishesReducer(state, action);
}
