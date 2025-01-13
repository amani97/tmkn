import { AuthConfig } from '../../model/dtos';

export abstract class IAuthConfigService {
  config!: AuthConfig;
  abstract get authConfig(): AuthConfig;
  public abstract set(config: AuthConfig): void;
}
