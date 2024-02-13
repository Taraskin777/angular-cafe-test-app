import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Dishes } from 'src/app/shared/interfaces/dishes';
import { map, tap } from 'rxjs';

export interface NewDish {
  categoryId: string;
  name: string;
  image: string;
  description: string;
  price: number;
}

@Injectable({
  providedIn: 'root',
})
export class DishesService {
  url: string = environment.url;

  private dishes = new BehaviorSubject<Dishes[]>([]);

  currentDishes$ = this.dishes.asObservable();

  private foundDishes = new BehaviorSubject<Dishes[]>([]);

  foundDishes$ = this.foundDishes.asObservable();

  constructor(private http: HttpClient) {}

  public getDishesFromCategory(category: string): Observable<Dishes[]> {
    return this.http
      .get<Dishes[]>(`${this.url}/dishes?categoryId=${category}`)
      .pipe(
        catchError(error => {
          console.error(
            `Error fetching dishes for category with category ${category}:`,
            error
          );
          return throwError(() => new Error('Error'));
        })
      );
  }

  public updateDishes(categoryId: string): Observable<Dishes[]> {
    return this.getDishesFromCategory(categoryId).pipe(
      tap((dishes: Dishes[]) => {
        this.dishes.next(dishes);
      }),
      catchError(error => {
        console.log('Error updating dishes: ', error);
        return throwError(() => new Error('Error'));
      })
    );
  }

  public addDish(dish: NewDish): Observable<Dishes> {
    return this.http.post<Dishes>(`${this.url}/dishes`, dish).pipe(
      catchError(error => {
        console.error('Error adding dish:', error);
        return throwError(() => new Error('Error'));
      })
    );
  }

  public removeDish(dishId: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/dishes/${dishId}`).pipe(
      catchError(error => {
        console.error('Error deleting ${dishId}', error);
        return throwError(() => new Error('Error'));
      })
    );
  }

  public getDishById(dishId: string): Observable<Dishes> {
    return this.http.get<Dishes>(`${this.url}/dishes/${dishId}`).pipe(
      catchError(error => {
        console.error('Error fetching dish with id ${dishId}:', error);
        return throwError(() => new Error('Error'));
      })
    );
  }

  public editDish(dishId: string, updatedDish: NewDish): Observable<Dishes> {
    return this.http
      .put<Dishes>(`${this.url}/dishes/${dishId}`, updatedDish)
      .pipe(
        catchError(error => {
          console.error('Error updating ${dishId}', error);
          return throwError(() => new Error('Error'));
        })
      );
  }

  public findDishes(dishName: string): Observable<Dishes[]> {
    const trimmedDishName = dishName.trim();
    return this.http.get<Dishes[]>(`${this.url}/dishes`).pipe(
      map((dishes: Dishes[]) => {
        return dishes.filter((dish: Dishes) =>
          dish.name.toLowerCase().includes(trimmedDishName.toLowerCase())
        );
      }),
      tap((filteredDishes: Dishes[]) => {
        this.foundDishes.next(filteredDishes);
      }),
      catchError(error => {
        console.error('Error fetching dishes:', error);
        return throwError(() => new Error('Error'));
      })
    );
  }

  public clearFoundDishes(): void {
    this.foundDishes.next([]);
  }
}
