import { Component, DestroyRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form: FormGroup;
  isAdmin: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private destroyRef: DestroyRef
    
  ) {
    this.form = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control(
        '',
        Validators.compose([Validators.required, Validators.minLength(6)])
      ),
    });
  }

  login() {
    const val = this.form.value;

    if (
      val.email &&
      val.email === 'taras@gmail.com' &&
      val.password &&
      val.password === '123456'
    ) {
      this.authService
        .login(val.email, val.password)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.router.navigateByUrl('/');
        });
    } else {
      this.authService.logout();
      this.isAdmin = 'Wrong email or password';
    }
  }
}
