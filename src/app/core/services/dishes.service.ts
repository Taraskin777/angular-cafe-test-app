import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Dishes } from 'src/app/shared/interfaces/dishes';
import { of } from 'rxjs';

export interface NewDish {
  categoryId: number;
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

  constructor(private http: HttpClient) {}

  public addDish(dish: NewDish): Observable<Dishes> {
    return this.http.post<Dishes>(`${this.url}/dishes`, dish).pipe(
      catchError(error => {
        console.error('Error adding dish:', error);
        return throwError(error);
      })
    );
  }

  public removeDish(dishId: number) {}

  public editDish(dishId: number, updateDish: Dishes) {}
}
