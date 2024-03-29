import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError, BehaviorSubject } from 'rxjs';
import { Categories } from 'src/app/shared/interfaces/categories';
import { environment } from 'src/environment/environment';
import { switchMap, forkJoin } from 'rxjs';
import { Dishes } from 'src/app/shared/interfaces/dishes';
import { of, tap } from 'rxjs';

interface NewCategory {
  name: string;
  image: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  url: string = environment.url;

  private categories = new BehaviorSubject<Categories[]>([]);

  currentCategories$ = this.categories.asObservable();

  constructor(private http: HttpClient) {}

  public getAllCategories(): Observable<Categories[]> {
    return this.http.get<Categories[]>(`${this.url}/categories`).pipe(
      catchError(error => {
        console.error('Error fetching categories:', error);
        return throwError(() => new Error('Error fetching categories'));
      })
    );
  }

  public updateCategories(): Observable<Categories[]> {
    return this.getAllCategories().pipe(
      tap((categories: Categories[]) => {
        this.categories.next(categories);
      }),
      catchError(error => {
        console.error('Error updating categories:', error);
        return throwError(() => new Error('Error updating categories'));
      })
    );
  }

  public addCategory(newCategory: NewCategory): Observable<Categories> {
    return this.http
      .post<Categories>(`${this.url}/categories`, newCategory)
      .pipe(
        catchError(error => {
          console.error('Error add new category:', error);
          return throwError(() => new Error('Error adding new category'));
        })
      );
  }

  public removeCategory(categoryId: string): Observable<void> {
    return this.http.get<Dishes[]>(`${this.url}/dishes`).pipe(
      switchMap((dishes: Dishes[]) => {
        const filteredDishes = dishes.filter(
          dish => dish.categoryId === categoryId
        );
        const deleteCategory$ = this.http.delete<void>(
          `${this.url}/categories/${categoryId}`
        );
        const deleteDishes$ = this.deleteDishes(filteredDishes);
        return forkJoin([deleteCategory$, deleteDishes$]).pipe(
          switchMap(() => {
            return new Observable<void>(observer => {
              observer.next();
              observer.complete();
            });
          }),
          catchError(error => {
            console.error('Error removing category and related dishes:', error);
            return throwError(() => new Error('Error'));
          })
        );
      }),
      catchError(error => {
        console.error('Error fetching dishes:', error);
        return throwError(() => new Error('Error'));
      })
    );
  }

  private deleteDishes(dishes: Dishes[]): Observable<object[]> {
    return dishes.length
      ? forkJoin(
          dishes.map(dish => this.http.delete(`${this.url}/dishes/${dish.id}`))
        )
      : of([]);
  }

  public getCategory(categoryId: string): Observable<Categories> {
    return this.http
      .get<Categories>(`${this.url}/categories/${categoryId}`)
      .pipe(
        catchError(error => {
          console.error('Error fetching category:', error);
          return throwError(() => new Error('Error fetching category'));
        })
      );
  }

  public editCategory(
    categoryId: string,
    updatedCategory: Categories
  ): Observable<Categories> {
    return this.http
      .put<Categories>(`${this.url}/categories/${categoryId}`, updatedCategory)
      .pipe(
        catchError(error => {
          console.error('Error updating category:', error);
          return throwError(() => new Error('Error edit category'));
        })
      );
  }
}
