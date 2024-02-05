import { Component, DoCheck, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements DoCheck, OnInit {
  // isAuthorized: boolean = false;
  authorizedUser$: Observable<boolean> | undefined;

  constructor(
    private authService: AuthService,
    private router: Router,
    private auth: AuthService
  ) {}

  // checkAdmin(): void {
  //   if (this.authService.isAdmin()) {
  //     this.isAuthorized = true;
  //   } else {
  //     this.isAuthorized = false;
  //   }
  // }

  ngOnInit(): void {
    this.authorizedUser$ = this.auth.currentAuth;
  }

  ngDoCheck(): void {
    // this.checkAdmin();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}
