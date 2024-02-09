import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Categories } from 'src/app/shared/interfaces/categories';
import { environment } from 'src/environment/environment';
import { Dishes } from 'src/app/shared/interfaces/dishes';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  url: string = environment.url;

  private categories = new BehaviorSubject<Categories[]>([]);

  currentCategories$ = this.categories.asObservable();

  constructor(private http: HttpClient) {}

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

  public updateCategories(): Observable<Categories[]> {
    return this.getData().pipe(
      tap((categories: Categories[]) => {
        this.categories.next(categories);
      }),
      catchError(error => {
        console.error('Error updating categories:', error);
        return throwError(() => new Error('test'));
      })
    );
  }
}
