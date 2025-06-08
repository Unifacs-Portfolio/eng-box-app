import React, {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react';
import { getUserDetails } from '../../utils/session/user-data';
import { UserProfile } from '../../utils/types/UserProfile';

interface UserContextProps {
	userProfile: UserProfile;
	setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
	const [userProfile, setUserProfile] = useState<UserProfile>(
		{} as UserProfile,
	);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		(async () => {
			const user = await getUserDetails(userProfile.email);

			if (user) {
				setUserProfile((state) => {
					return {
						...state,
						email: user.email,
						nome: user.nome,
						telefone: user.telefone,
						profilePhotoUrl: user.profilePhotoUrl,
						isMonitor: user.isMonitor,
						nivelConsciencia: user.nivelConsciencia,
						token: user.token,
					};
				});
			}
		})();
	}, []);

	return (
		<UserContext.Provider value={{ userProfile, setUserProfile }}>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = (): UserContextProps => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error('userUser must be used within a UserProvider');
	}
	return context;
};
