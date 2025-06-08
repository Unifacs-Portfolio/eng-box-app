import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import PostComponent from '../../Components/posts/home';
import { getApiAxios } from '../../services/axios';
import { getToken } from '../../utils/session/manager';
import { NavigationProp } from '../../utils/types/navigation';
import { Post } from '../../utils/types/post';
import Spinner from '../../Components/spinner';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useUser } from '../../Components/profile/UserContext';
import { UserResponse } from '../../utils/types/user-response';

const Home = () => {
	const [posts, setPosts] = useState<Post[]>([]);
	const [loading, setLoading] = useState(true);
	const [users, setUsers] = useState<UserResponse[]>([]);
	const navigation = useNavigation<NavigationProp>();
	const { userProfile } = useUser();

	const fetchPosts = async () => {
		try {
			const api = await getApiAxios();
			const response = await api.get('/api/receitas');
			const sortedPosts = response.data.sort(
				(a: Post, b: Post) =>
					new Date(b.dataCriacao).getTime() - new Date(a.dataCriacao).getTime(),
			);
			setPosts(sortedPosts);
		} catch (error) {
			console.error('Erro ao buscar posts:', error);
			Alert.alert('Erro', 'Não foi possível carregar as Postagens');
		} finally {
			setLoading(false);
		}
	};

	const fetchUsers = async () => {
		try {
			const api = await getApiAxios();
			const response = await api.get('/api/usuario'); // endpoint que retorna todos os usuários
			setUsers(response.data);
		} catch (error) {
			console.error('Erro ao buscar usuários:', error);
		}
	};

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

				await fetchUsers();
				await fetchPosts();
			})();
			return () => {
				// Do something when the screen is unfocused
				// Useful for cleanup functions
			};
		}, []),
	);

	// // Crie um mapa de usuários para acesso rápido
	const userMap = React.useMemo(() => {
		const map: Record<string, UserResponse> = {};
		// biome-ignore lint/complexity/noForEach: <explanation>
		users.forEach((user) => {
			map[user.email] = user;
		});
		return map;
	}, [users]);

	const renderPost = ({ item }: { item: Post }) => (
		<View className="mb-8">
			<PostComponent post={item} user={userMap[item.idUsuario]} />
		</View>
	);

	if (loading) return <Spinner />;

	return (
		<View className="flex-1 space-y-2 pt-4 bg-white">
			<FlatList
				data={posts}
				keyExtractor={(item) => item.id.toString()}
				renderItem={renderPost}
				ListHeaderComponent={<HomeHeader username="john.doe" />}
				contentContainerStyle={{ paddingBottom: 45 }}
			/>
		</View>
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
