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
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.checkAdminStatus();
    this.authorizedUser$ = this.auth.currentAuth$;
  }

  checkAdminStatus(): void {
    const isAdmin = this.auth.isAdmin();
    this.auth.changeAuth(isAdmin);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}
