import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categories } from 'src/app/shared/interfaces/categories';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  url: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  public getData(): Observable<Categories[]> {
    return this.http.get<Categories[]>(`${this.url}/categories`);
  }
}
