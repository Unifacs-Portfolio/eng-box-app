import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';
import { TokenData } from '../types/token';
import { axiosGeral } from '../../services/axios';

let tokens: string | null = null;

export const saveToken = async (token: string) => {
	// await SecureStore.setItemAsync('token-session', token);
	tokens = token;
};

export const getToken = async () => {
	// const token = await SecureStore.getItemAsync('token-session');
	const token = tokens;
	return token;
};

export const removeToken = async () => {
	await SecureStore.deleteItemAsync('token-session');
};

export async function decryptToken(
	token: string | undefined,
): Promise<TokenData | null> {
	try {
		if (token) {
			const payload = jwtDecode(token);
			return payload as TokenData;
		}

		return null;
	} catch (error) {
		console.error(error);
		alert('Erro na sessão');
		await removeToken();

		return null;
	}
}
