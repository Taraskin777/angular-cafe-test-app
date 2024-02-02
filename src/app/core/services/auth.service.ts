import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environment/environment';

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
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http
      .post<AuthResult>(`${environment.url}/users/1`, { email, password })
      .pipe(
        tap((res: AuthResult) => {
          if (res && res.role === 'admin') {
            localStorage.setItem('user_role', 'admin');
          }
          this.setSession(res);
        })
      );
  }

  private setSession(authResult: AuthResult) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem('user_role', authResult.role);

    if (authResult.role === 'admin') {
      console.log('You are logged in as an admin.');
    }
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('user_role');
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = expiration ? moment(JSON.parse(expiration)) : null;
    return expiresAt;
  }

  isAdmin() {
    const userRole = localStorage.getItem('user_role');
    return userRole === 'admin';
  }
}
