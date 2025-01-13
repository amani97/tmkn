import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IAuthenticationFacade } from '../../abstracts/facades';
import { IAuthenticationAPIService } from '../../abstracts/services';
import { ConfirmEmailCommand } from '../../model/commands';
import { Subject } from 'rxjs';
import { ILoaderFacade } from '@tmkn/core';

@Component({
  selector: 'auth-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.scss',
  standalone: false,
})
export class ConfirmEmailComponent implements OnInit {
  private authenticationFacade = inject(IAuthenticationFacade);
  private authenticationAPIService = inject(IAuthenticationAPIService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private loaderFacade = inject(ILoaderFacade);

  isLoading$: Subject<boolean> = this.loaderFacade.isLoading;

  ngOnInit(): void {
    const confirmEmailCommand: ConfirmEmailCommand = {
      userName: this.activatedRoute.snapshot.queryParams['username'],
      userId: this.activatedRoute.snapshot.queryParams['userId'],
      token: this.activatedRoute.snapshot.queryParams['token'],
    };

    this.authenticationAPIService.confirmEmail(confirmEmailCommand).subscribe({
      next: () => {
        this.router.navigate([this.authenticationFacade.redirectUrl || '']);
      },
    });
  }
}
