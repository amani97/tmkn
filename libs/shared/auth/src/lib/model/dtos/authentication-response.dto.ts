import { LoginResponse } from './login-response.dto';
import { User } from './user.dto';

export interface AuthenticationResponse {
  loginResponse: LoginResponse;
  user: User;
}
