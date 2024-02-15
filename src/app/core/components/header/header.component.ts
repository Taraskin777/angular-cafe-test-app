import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {
  clearFoundedDishes,
  foundedDishes,
} from 'src/app/store/dishes.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  authorizedUser$: Observable<boolean> | undefined;
  searchValue: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.authService.checkAdminStatus();
    this.authorizedUser$ = this.authService.currentAuth$;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

  searchDishes(): void {
    if (this.searchValue.length >= 3) {
      this.store.dispatch(foundedDishes({ dishName: this.searchValue }));
    } else if (this.searchValue.length < 3) {
      this.store.dispatch(clearFoundedDishes());
    }
  }
}
