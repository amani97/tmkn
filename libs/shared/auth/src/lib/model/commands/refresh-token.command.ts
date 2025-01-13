export interface RefreshTokenCommand {
  refresh_token: string;
  grant_type: string;
  client_id: string;
  client_secret: string;
}
