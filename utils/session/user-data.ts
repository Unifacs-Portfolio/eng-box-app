import { getApiAxios } from '../../services/axios';
import { userStore } from '../stores/user';
import { UserResponse } from '../types/user-response';
import { UserProfile } from '../types/UserProfile';
import { getToken } from './manager';

export const getUserDetails = async (email: string) => {
	// const token = await getToken();
	// if (token) {
	// 	if (userStore.getState().user) {
	// 		return userStore.getState().user;
	// 	}

	const axios = await getApiAxios();
	const { data } = await axios.get<UserProfile>(`/api/usuario/${email}`);

	const user = {
		nome: data.nome,
		email: data.email,
		profilePhotoUrl: data.profilePhotoUrl ?? null,
		isMonitor: data.isMonitor,
		nivelConsciencia: data.nivelConsciencia,
		telefone: data.telefone,
		token: data.token,
	};

	// Chama o gerenciador de estado global do zustand para armazenar o nome do usuário
	userStore.getState().setUser(user);
	return user;
	// } else {
	// 	return null;
	// }
};

export const getUserDetailsByEmail = async () => {
	try {
		const axios = await getApiAxios();
		const { data: user } = await axios.get<UserResponse>('/api/usuario');

		return user;
	} catch (error: any) {
		if (error.response) {
			const { status, data: errorData } = error.response;
			console.log('ta dando merda');
			console.log(errorData);
		}
	}
};
