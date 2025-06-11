import axios from 'axios';
import { getToken } from '../utils/session/manager';
export const axiosLogin = axios.create({
	baseURL: 'https://mockapi-eng-box-app.vercel.app',
});

export const axiosGeral = axios.create({
	baseURL: 'https://mockapi-eng-box-app.vercel.app',
});

export const getApiAxios = async () => {
	const token = await getToken();

	const api = axios.create({
		baseURL: 'https://mockapi-eng-box-app.vercel.app',
		headers: {
			Authorization: token,
		},
	});

	return api;
};
export const PostApiAxios = axios.create({
	baseURL: 'https://mockapi-eng-box-app.vercel.app',
});
