import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState, useTransition } from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderMenu from '../../Components/buttons/HeaderMenu';
import PostList from '../../Components/profile/PostList';
import ProfileImagesSection from '../../Components/profile/ProfileImagesSection';
import ProfileInfo from '../../Components/profile/ProfileInfo';
import Spinner from '../../Components/spinner';
import { getApiAxios } from '../../services/axios';
import { getToken } from '../../utils/session/manager';
import { getUserDetails } from '../../utils/session/user-data';
import { NavigationProp } from '../../utils/types/navigation';

import { UserResponse } from '../../utils/types/user-response';
import { useUser } from '../../Components/profile/UserContext';
import { Post } from '../../utils/types/UserProfile';

const Profile = () => {
	const navigation = useNavigation<NavigationProp>();
	const { userProfile, setUserProfile } = useUser();
	// const [userPostagens, setUserPostagens] = useState<Post[]>([]);
	const [loading, setLoading] = useState(false);
	console.log('User Profile:', userProfile);

	// const fetchUserPosts = async (userEmail: string) => {
	// 	try {
	// 		const api = await getApiAxios();
	// 		const response = await api.get('/api/receitas');
	// 		const userPosts = response.data
	// 			.filter((posts: Post) => posts.id === userEmail)
	// 			.sort(
	// 				(a: Post, b: Post) =>
	// 					new Date(b.dataCriacao).getTime() -
	// 					new Date(a.dataCriacao).getTime(),
	// 			);

	// 		setUserPostagens(userPosts);
	// 		console.log('Postagens filtradas', userPosts);
	// 	} catch (error) {
	// 		console.error('Erro ao carregar as postagens:', error);
	// 		Alert.alert('Erro', 'Não foi possível carregar os dados do perfil.');
	// 	}
	// };

	useFocusEffect(
		// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
		React.useCallback(() => {
			setLoading(true);
			(async () => {
				try {
					const api = await getApiAxios();
					const { data } = await api.get<UserResponse>(
						`/api/usuario/${userProfile.email}`,
					);
					setUserProfile(data);
				} catch (error) {
					console.error('Erro ao carregar perfil:', error);
					Alert.alert('Erro', 'Não foi possível carregar os dados do perfil.');
				} finally {
					setLoading(false);
				}
			})();
			return () => {
				setLoading(false);
			};
		}, [userProfile.email, setUserProfile, userProfile.nome]),
	);

	if (loading) return <Spinner />;

	return (
		<SafeAreaView className="flex-1">
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: 45 }}
			>
				<View className="flex-row justify-end m-2">
					<HeaderMenu />
				</View>

				<ProfileImagesSection user={userProfile} />

				<ProfileInfo user={userProfile} />

				<View className="flex items-center justify-center w-full h-[40px] border-b-2 border-[#B8B8B8] mt-[32px]">
					<Text
						className="text-base text-[#4A4A4A]"
						style={{ fontFamily: 'poppins-medium' }}
					>
						Postagens
					</Text>
				</View>

				<PostList posts={userProfile.posts} key={userProfile.posts.length} />
			</ScrollView>
		</SafeAreaView>
	);
};

export default Profile;
