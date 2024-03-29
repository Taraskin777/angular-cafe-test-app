import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form: FormGroup;
  logMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
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
        .pipe(take(1))
        .subscribe(() => {
          this.router.navigateByUrl('/');
        });
    } else {
      this.authService.logout();
      this.logMessage = 'Wrong email or password';
    }
  }
}
