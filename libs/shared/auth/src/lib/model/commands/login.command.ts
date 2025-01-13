export interface LoginCommand {
  userName: string;
  password: string;
  clientId: string;
  clientSecret: string;
	platform: number;
	fcmToken: string | undefined;
}
