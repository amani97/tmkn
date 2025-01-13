export interface ResetPasswordCommand {
	email: string;
	token: string;
	password: string;
	confirmPassword: string;
}

export interface ConfirmEmailCommand {
	userName: string;
	userId: number;
	token: string;
}
