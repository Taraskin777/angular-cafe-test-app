import { Component, DoCheck, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  authorizedUser$: Observable<boolean> | undefined;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkAdminStatus();
    this.authorizedUser$ = this.authService.currentAuth$;
  }

  checkAdminStatus(): void {
    const isAdmin = this.authService.isAdmin();
    this.authService.changeAuth(isAdmin);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}
