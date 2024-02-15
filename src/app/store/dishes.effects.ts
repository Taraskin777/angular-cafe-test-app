import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, exhaustMap } from 'rxjs/operators';
import { DishesService } from '../core/services/dishes.service';
import { of } from 'rxjs';
import * as DishesActions from './dishes.actions';

@Injectable()
export class DishesEffects {
  constructor(
    private actions$: Actions,
    private dishesService: DishesService
  ) {}

  findDishes$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[DISHES] Set Founded Dishes'),
      exhaustMap(({ dishName }) => {
        console.log('Searching for dishes with name:', dishName);
        return this.dishesService.findDishes(dishName).pipe(
          map(dishes => DishesActions.foundedDishes({ dishes, dishName })),
          catchError(error => of(/* handle error */))
        );
      })
    )
  );
}
