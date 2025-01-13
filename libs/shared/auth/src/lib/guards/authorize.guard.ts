import { inject } from '@angular/core';
import { IAuthenticationFacade } from '../abstracts/facades';

export const AuthorizeGuard = () => {
	const authenticationFacade = inject(IAuthenticationFacade);

	if (authenticationFacade.isAuthenticated()) {
		return true;
	}
	return false;
};
