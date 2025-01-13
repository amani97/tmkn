import { LoginResponse, User } from '../dtos';

export interface AuthenticationState {
  idTokenClaims: LoginResponse | null | undefined;
  isAuthenticated: boolean;
  isLoading: boolean;
}
