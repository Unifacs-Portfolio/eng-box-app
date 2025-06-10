export interface UserProfile {
	id: number;
	email: string;
	token: string;
	nome: string;
	telefone: string;
	nivelConsciencia: number;
	profilePhotoUrl: string;
	isMonitor: boolean;
	posts: Post[];
}

export interface Post {
	id: string;
	dataCriacao: string;
	titulo: string;
	tema: string;
	subtemas: string;
	conteudo: string;
	fotos: Foto[];
}

export interface Foto {
	url: string;
	name: string;
	type: string;
}
