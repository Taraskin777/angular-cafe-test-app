import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
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

  ngOnInit(): void {
    this.checkAdmin();
    console.log(this.isAuthorized);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}
