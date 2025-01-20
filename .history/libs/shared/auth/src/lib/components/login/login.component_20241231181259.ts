import { Component, inject } from '@angular/core';
import { IAuthenticationFacade } from '../../abstracts/facades/authentication.abstract';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserCredential } from '../../model/dtos';
import { Router } from '@angular/router';
import { IAuthenticationAPIService } from '../../abstracts/services';
import { AuthRoute } from '../../settings';
import { Subject } from 'rxjs';
import { ILoaderFacade } from '@tmkn/core';

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
    if (this.loginFg.valid) {
      const userCredential: UserCredential = {
        userName: this.loginFg?.get('userName')?.value,
        password: this.loginFg?.get('password')?.value,
      };
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
