import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Dishes } from 'src/app/shared/interfaces/dishes';
import { of } from 'rxjs';

interface NewDish {
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

  public addDish(dish: NewDish) {}

  public removeDish(dishId: number) {}

  public updateDish(dishId: number, updateDish: Dishes) {}
}
