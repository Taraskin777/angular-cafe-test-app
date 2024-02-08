import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError, BehaviorSubject } from 'rxjs';
import { Categories } from 'src/app/shared/interfaces/categories';
import { environment } from 'src/environment/environment';
import { switchMap, forkJoin } from 'rxjs';
import { Dishes } from 'src/app/shared/interfaces/dishes';

interface NewCategory {
  name: string;
  image: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  url: string = environment.url;

  constructor(private http: HttpClient) {}

  public addCategory(newCategory: NewCategory): Observable<Categories> {
    return this.http
      .post<Categories>(`${this.url}/categories`, newCategory)
      .pipe(
        catchError(error => {
          console.error('Error add new category:', error);
          return throwError(() => new Error('Error'));
        })
      );
  }

  public removeCategory(categoryId: string): Observable<void> {
    // return this.http.delete<void>(`${this.url}/categories/${categoryId}`).pipe(
    //   switchMap(() => {
    //     console.log('Switch');
    //     return this.http.delete<void>(
    //       `${this.url}/dishes?categoryId=${categoryId}`
    //     );
    //   }),
    //   catchError(error => {
    //     console.error('Error remove category and related dishes:', error);
    //     return throwError(() => new Error('Error'));
    //   })
    // );

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

  private deleteDishes(dishes: Dishes[]): Observable<void[]> {
    const deleteRequests: Observable<void>[] = [];
    dishes.forEach(dish => {
      const request = this.http.delete<void>(`${this.url}/dishes/${dish.id}`);
      deleteRequests.push(request);
    });
    return forkJoin(deleteRequests);
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
          return throwError(() => new Error('Error updating category'));
        })
      );
  }
}
