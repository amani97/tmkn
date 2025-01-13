import { Component, inject, OnInit } from '@angular/core';
import { IAuthenticationFacade } from '../../abstracts/facades';

@Component({
  selector: 'auth-auth-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
  standalone: false,
})
export class LogoutComponent implements OnInit {
  private authenticationFacade = inject(IAuthenticationFacade);

  ngOnInit(): void {
    this.authenticationFacade.logout();
  }
}
