 interface Dishes {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
}

export interface Data {
  id: number;
  name: string;
  image: string;
  dishes: Dishes[];
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  public getData(): Observable<Data[]> {
    return this.http.get<Data[]>('http://localhost:3000/categories');
  }
}
