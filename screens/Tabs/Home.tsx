import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import PostComponent from '../../Components/posts/home';
import { getApiAxios } from '../../services/axios';
import { getToken } from '../../utils/session/manager';
import { NavigationProp } from '../../utils/types/navigation';
import Spinner from '../../Components/spinner';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useUser } from '../../Components/profile/UserContext';
import { UserResponse } from '../../utils/types/user-response';
import { Post, UserProfile } from '../../utils/types/UserProfile';
import { User } from '../../utils/types/user';

const Home = () => {
	// const [posts, setPosts] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [users, setUsers] = useState<UserResponse[]>([]);
	const [userMap, setUserMap] = useState<{ [key: number]: UserResponse }>({});
	const navigation = useNavigation<NavigationProp>();
	const { userProfile } = useUser();

	const fetchPosts = async () => {
		try {
			const api = await getApiAxios();
			const { data } = await api.get<UserResponse[]>('/api/usuarios');
			setUsers(data);
		} catch (error) {
			console.error('Erro ao buscar posts:', error);
			Alert.alert('Erro', 'Não foi possível carregar as Postagens');
		} finally {
			setLoading(false);
		}
	};

	// const fetchUsers = async () => {
	// 	try {
	// 		const api = await getApiAxios();
	// 		const response = await api.get('/api/usuario'); // endpoint que retorna todos os usuários
	// 		setUsers(response.data);
	// 	} catch (error) {
	// 		console.error('Erro ao buscar usuários:', error);
	// 	}
	// };

	useFocusEffect(
		// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
		React.useCallback(() => {
			// Do something when the screen is focused
			(async () => {
				// const token = await getToken();
				if (!userProfile) {
					alert('Você precisa realizar o login para acessar!');
					navigation.navigate('Login');
					return;
				}

				// await fetchUsers();
				await fetchPosts();
			})();
			return () => {
				// Do something when the screen is unfocused
				// Useful for cleanup functions
			};
		}, []),
	);

	// const renderPost = ({ item }: { item: Post }) => (
	// 	<View className="mb-8">
	// 		<PostComponent post={item} />
	// 	</View>
	// );

	if (loading) return <Spinner />;

	return (
		<ScrollView className="flex-1 space-y-2 pt-4 bg-white">
			<HomeHeader username={userProfile.nome} />
			{/* {users.map((user) =>
				user.posts.map((post) => (
					<View key={post.id} className="mb-8">
						<PostComponent post={post} user={user} />
					</View>
				)),
			)} */}
			{[...users]
				.sort((a, b) => b.id - a.id) // Troque 'id' por 'createdAt' se for o caso
				.map((user) =>
					user.posts.map((post) => (
						<View key={post.id} className="mb-8">
							<PostComponent post={post} user={user} />
						</View>
					)),
				)}
		</ScrollView>
	);
};

type HomeHeaderProps = {
	username: string;
};

const HomeHeader = ({ username }: HomeHeaderProps) => {
	const navigation = useNavigation<NavigationProp>();

	return (
		<SafeAreaView>
			<View className="px-4 flex flex-row my-6 items-center gap-x-3 mb-5 ">
				<View className=" h-full w-full ">
					<View className="flex-row items-center justify-between">
						<Image
							source={require('../../assets/images/login/LogoAppHome.png')}
						/>

						<TouchableOpacity
							className="mr-4"
							onPress={() => navigation.navigate('Menu')}
						>
							<Ionicons name="menu" size={28} />
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default Home;
