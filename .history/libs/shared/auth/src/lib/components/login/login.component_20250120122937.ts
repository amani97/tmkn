import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthRoute } from '../../settings';
import { IAuthenticationAPIService } from '../../abstracts/services';
import { IAuthenticationFacade } from '../../abstracts/facades/authentication.abstract';
import { ILoaderFacade } from '@tmkn/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UserCredential } from '../../model/dtos';

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false,
})
export class LoginComponent {
  RegisterAccountLink = [
    AuthRoute.DefaultLoginRedirectPath,
    'auth',
    AuthRoute.Register,
  ];
  ForgetPasswordLink = [
    AuthRoute.DefaultLoginRedirectPath,
    'auth',
    AuthRoute.ForgetPassword,
  ];
  password: boolean[] = [false];
  private authenticationFacade = inject(IAuthenticationFacade);
  private authenticationAPIService = inject(IAuthenticationAPIService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private loaderFacade = inject(ILoaderFacade);

  isAuthenticated = this.authenticationFacade.isAuthenticated$;
  isLoading$: Subject<boolean> = this.loaderFacade.isLoading;

  loginFg: FormGroup = this.formBuilder.group({
    userName: ['', [Validators.required, Validators.maxLength(50)]],
    password: ['', [Validators.required]],
  });

  redirectToForgetPassword() {
    this.router.navigate([AuthRoute.Main, AuthRoute.ForgetPassword]);
  }

  async onSubmit(): Promise<void> {
    console.log(this.loginFg)
    if (this.loginFg.valid) {
      const userCredential: UserCredential = {
        userName: this.loginFg?.get('userName')?.value,
        password: this.loginFg?.get('password')?.value,
      };
      console.log()
      this.authenticationAPIService.login(userCredential).subscribe({
        next: () => {
          if (this.authenticationFacade.redirectUrl.includes('dashboard')) {
            this.router.navigate([this.authenticationFacade.redirectUrl || '']);
          } else {
            this.router.navigate(['dashboard']);
          }
        },
      });
    }
  }

  togglePassword(index: any) {
    this.password[index] = !this.password[index];
  }
}
