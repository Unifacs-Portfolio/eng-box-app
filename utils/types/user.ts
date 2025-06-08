import { UserResponse } from './user-response';

export type User = Pick<
	UserResponse,
	| 'email'
	| 'profilePhotoUrl'
	| 'isMonitor'
	| 'nivelConsciencia'
	| 'nome'
	| 'telefone'
>;
