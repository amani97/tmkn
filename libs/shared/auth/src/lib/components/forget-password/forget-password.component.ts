import { Component, inject, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { IAuthenticationAPIService } from '../../abstracts/services';
import { ForgetPasswordCommand } from '../../model/commands';
import { AuthRoute } from '../../settings';
import { ILoaderFacade } from '@tmkn/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'med-auth-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',
  standalone: false,
})
export class ForgetPasswordComponent implements OnInit {
  private authenticationAPIService = inject(IAuthenticationAPIService);
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private loaderFacade = inject(ILoaderFacade);

  forgetFg!: FormGroup;
  isLoading$: Subject<boolean> = this.loaderFacade.isLoading;

  ngOnInit(): void {
    const forgetPasswordCommand: ForgetPasswordCommand = {
      email: null as unknown as string,
    };
    this.initForm(forgetPasswordCommand);
  }

  initForm(command: ForgetPasswordCommand) {
    this.forgetFg = this.formBuilder.group({
      email: new FormControl<string | undefined>(command.email, {
        validators: [Validators.required],
      }),
    });
  }

  async onSubmit(): Promise<void> {
    if (this.forgetFg.valid) {
      const forgetPasswordCommand: ForgetPasswordCommand = {
        email: this.forgetFg?.get('email')?.value,
      };
      this.authenticationAPIService
        .forgetPasswordEmailConfirm(forgetPasswordCommand)
        .subscribe({
          next: () => {
            this.router.navigate([AuthRoute.Main, AuthRoute.ForgetPassword]);
          },
        });
    }
  }
}
