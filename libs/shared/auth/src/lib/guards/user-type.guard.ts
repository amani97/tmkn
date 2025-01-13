import { inject } from '@angular/core';
import { IAuthenticationFacade } from '../abstracts/facades';
import { UserType } from '../model/enums';

export const UserTypeMatchGuard = (userTypes: UserType[], authGuardService = inject(IAuthenticationFacade)) =>
	authGuardService.isAllowed(userTypes);
