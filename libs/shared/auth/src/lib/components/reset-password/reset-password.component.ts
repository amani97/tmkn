import { Component, inject, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IAuthenticationFacade } from '../../abstracts/facades';
import { IAuthenticationAPIService } from '../../abstracts/services';
import { ResetPasswordCommand } from '../../model/commands';
import { Subject } from 'rxjs';
import { ILoaderFacade } from '@tmkn/core';

@Component({
  selector: 'auth-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
  standalone: false,
})
export class ResetPasswordComponent implements OnInit {
  private authenticationFacade = inject(IAuthenticationFacade);
  private authenticationAPIService = inject(IAuthenticationAPIService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private loaderFacade = inject(ILoaderFacade);

  confirmFg!: FormGroup;
  isLoading$: Subject<boolean> = this.loaderFacade.isLoading;

  ngOnInit(): void {
    const resetPasswordCommand: ResetPasswordCommand = {
      token: this.activatedRoute.snapshot.queryParams['token'],
      email: this.activatedRoute.snapshot.queryParams['username'],
      password: null as unknown as string,
      confirmPassword: null as unknown as string,
    };
    this.initForm(resetPasswordCommand);
  }

  initForm(command: ResetPasswordCommand) {
    this.confirmFg = this.formBuilder.group({
      email: new FormControl<string | undefined>(command.email, {
        validators: [Validators.required],
      }),
      token: new FormControl<string | undefined>(command.token, {
        validators: [Validators.required],
      }),
      password: new FormControl<string | undefined>(command.password, {
        validators: [Validators.required],
      }),
      confirmPassword: new FormControl<string | undefined>(
        command.confirmPassword,
        {
          validators: [Validators.required],
        }
      ),
    });
  }

  async onSubmit(): Promise<void> {
    if (this.confirmFg.valid) {
      const resetPasswordCommand: ResetPasswordCommand = {
        email: this.confirmFg?.get('email')?.value,
        token: this.confirmFg?.get('token')?.value,
        password: this.confirmFg?.get('password')?.value,
        confirmPassword: this.confirmFg?.get('confirmPassword')?.value,
      };
      this.authenticationAPIService
        .resetPasswordEmailConfirm(resetPasswordCommand)
        .subscribe({
          next: () => {
            this.router.navigate([this.authenticationFacade.redirectUrl || '']);
          },
        });
    }
  }
}
