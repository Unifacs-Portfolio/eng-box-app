import { JwtPayload } from 'jwt-decode';

export type TokenResponse = {
	email: string;
	message: string;
	token: string;
};

export type TokenData = JwtPayload & {
	email: string;
};
