import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Categories } from 'src/app/shared/interfaces/categories';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  url: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  public getData(): Observable<Categories[]> {
    return this.http.get<Categories[]>(`${this.url}/categories`).pipe(
      catchError(error => {
        console.error('Error fetching categories:', error);
        return throwError(() => new Error('test'));
      })
    );
  }
}
