import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DishesService } from '../../services/dishes.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  authorizedUser$: Observable<boolean> | undefined;
  searchValue: string = '';
  placeholder: string = 'Search dish';
  minimumSearchValue: string = 'At least 3 letters';

  constructor(
    private authService: AuthService,
    private router: Router,
    private dishesService: DishesService
  ) {}

  ngOnInit(): void {
    this.authService.checkAdminStatus();
    this.authorizedUser$ = this.authService.currentAuth$;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

  searchDishes() {
    if (this.searchValue.length >= 3) {
      this.dishesService.findDishes(this.searchValue).subscribe();
    } else if (this.searchValue.length < 3) {
      this.dishesService.clearFoundDishes();
    } else {
      console.log('Please enter at least 3 characters.');
    }
  }
}
