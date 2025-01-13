import { GError } from './error.model';

export interface GResult<T = void> {
  isSuccess: boolean;
  errors: GError[];
  value: T;
}
