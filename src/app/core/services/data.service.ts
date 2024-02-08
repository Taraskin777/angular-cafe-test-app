import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { Categories } from 'src/app/shared/interfaces/categories';
import { environment } from 'src/environment/environment';
import { Dishes } from 'src/app/shared/interfaces/dishes';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  url: string = environment.url;

  private dishes = new BehaviorSubject<Dishes[]>([]);

  currentDishes$ = this.dishes.asObservable();

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  public getData(): Observable<Categories[]> {
    return this.http.get<Categories[]>(`${this.url}/categories`).pipe(
      catchError(error => {
        console.error('Error fetching categories:', error);
        return throwError(() => new Error('test'));
      })
    );
  }

  public getDishesFromCategory(category: number): Observable<Dishes[]> {
    return this.http
      .get<Dishes[]>(`${this.url}/dishes?categoryId=${category}`)
      .pipe(
        catchError(error => {
          console.error(
            `Error fetching dishes for category with category ${category}:`,
            error
          );
          return throwError(() => new Error('test'));
        })
      );
  }

  public updateDishes(): void {
    const categoryId = Number(this.route.snapshot.paramMap.get('categoryId'));

    this.getDishesFromCategory(categoryId)
      .pipe(take(1))
      .subscribe({
        next: (dishes: Dishes[]) => {
          this.dishes.next(dishes);
        },
        error: error => {
          console.error('Error updating dishes:', error);
        },
      });
  }
}
