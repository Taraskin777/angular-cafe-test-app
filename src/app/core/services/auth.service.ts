import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environment/environment';
import { User } from 'src/app/shared/interfaces/user';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

interface AuthResult {
  expiresIn: number;
  idToken: string;
  role: string;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authorization = new BehaviorSubject<boolean>(false);

  currentAuth$ = this.authorization.asObservable();

  constructor(private http: HttpClient) {}

  changeAuth(value: boolean): void {
    this.authorization.next(value);
  }

  login(email: string, password: string): Observable<User> {
    return this.http.get<User>(`${environment.url}/users/1`).pipe(
      tap((user: User) => {
        if (
          user &&
          user.id === '1' &&
          user.email === email &&
          user.password === password
        ) {
          localStorage.setItem('user_role', 'admin');
          localStorage.setItem('id_token', user.token);
          this.setSession({
            expiresIn: 3600,
            idToken: user.token,
            role: 'admin',
            token: user.token,
          });
          this.changeAuth(true);
        }
      })
    );
  }

  private setSession(authResult: AuthResult): void {
    const expiresAt = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem('user_role', authResult.role);
  }

  logout(): void {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('user_role');
    this.changeAuth(false);
  }

  isLoggedIn(): boolean {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  getExpiration(): moment.Moment | null {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = expiration ? moment(JSON.parse(expiration)) : null;
    return expiresAt;
  }

  isAdmin(): boolean {
    const userRole = localStorage.getItem('user_role');
    return userRole === 'admin';
  }
}
