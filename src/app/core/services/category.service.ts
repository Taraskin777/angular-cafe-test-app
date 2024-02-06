import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Categories } from 'src/app/shared/interfaces/categories';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  url: string = environment.url;

  constructor(private http: HttpClient) {}

  public addCategory(newCategory: Categories): Observable<Categories> {
    return this.http
      .post<Categories>(`${this.url}/categories`, newCategory)
      .pipe(
        catchError(error => {
          console.error('Error add new category:', error);
          return throwError(() => new Error('Error'));
        })
      );
  }

  public removeCategory() {}

  public editCategory() {}
}
