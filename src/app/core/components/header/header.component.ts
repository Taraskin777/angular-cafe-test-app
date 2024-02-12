import { Component, OnInit } from '@angular/core';
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
    this.authService.checkAdminStatus();
    this.authorizedUser$ = this.authService.currentAuth$;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}
