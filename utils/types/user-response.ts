import { Post } from './UserProfile';

export interface UserResponse {
	id: number;
	email: string;
	token: string;
	nome: string;
	telefone: string;
	nivelConsciencia: number;
	isMonitor: boolean;
	profilePhotoUrl: string;
	posts: Post[];
}

export interface User {
	id: number;
	email: string;
	token: string;
	nome: string;
	telefone: string;
	nivelConsciencia: number;
	isMonitor: boolean;
	post: Post[];
}
