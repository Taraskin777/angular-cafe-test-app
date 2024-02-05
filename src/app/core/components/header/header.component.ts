import { Component, DoCheck } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements DoCheck {
  isAuthorized: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  checkAdmin(): void {
    if (this.authService.isAdmin()) {
      this.isAuthorized = true;
    } else {
      this.isAuthorized = false;
    }
  }

  ngDoCheck(): void {
    this.checkAdmin();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}
