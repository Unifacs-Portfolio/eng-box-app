import { UserResponse } from './user-response';

export type User = Pick<
	UserResponse,
	| 'id'
	| 'email'
	| 'token'
	| 'nome'
	| 'telefone'
	| 'nivelConsciencia'
	| 'isMonitor'
	| 'profilePhotoUrl'
	| 'posts'
>;
