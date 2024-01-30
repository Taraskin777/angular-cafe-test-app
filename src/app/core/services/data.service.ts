import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Categories } from 'src/app/shared/interfaces/categories';
import { environment } from 'src/environment/environment';
import { Dishes } from 'src/app/shared/interfaces/dishes';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  url: string = environment.url;

  constructor(private http: HttpClient) {}

  public getData(): Observable<Categories[]> {
    return this.http.get<Categories[]>(`${this.url}/categories`).pipe(
      catchError(error => {
        console.error('Error fetching categories:', error);
        return throwError(() => new Error('test'));
      })
    );
  }

  public getDishesFromCategory(id: number): Observable<Dishes[]> {
    return this.http.get<Categories>(`${this.url}/categories/${id}`).pipe(
      map((category: Categories) => category.dishes),
      catchError(error => {
        console.error(
          `Error fetching dishes for category with id ${id}:`,
          error
        );
        return throwError(() => new Error('test'));
      })
    );
  }
}
