import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { getUserDetailsByEmail } from '../../utils/session/user-data';
import { UserResponse } from '../../utils/types/user-response';
import { Ionicons } from '@expo/vector-icons';
import { User } from '../../utils/types/user';
import { Post } from '../../utils/types/UserProfile';
type PostProps = {
	post: Post;
	user: User;
};

const PostComponent = ({ post, user }: PostProps) => {
	const imageUrl = post.fotos && post.fotos.length > 0 ? post.fotos[0] : '';
	// const [userPost, setUserPost] = useState<UserResponse | undefined>(undefined);
	const [isExpanded, setIsExpanded] = useState<boolean>(false);
	const MAX_LINES = 3;

	// useFocusEffect(
	// 	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	// 	React.useCallback(() => {
	// 		// Do something when the screen is focused
	// 		(async () => {
	// 			// const user = await getUserDetailsByEmail();
	// 			// setUserPost(user);
	// 		})();
	// 		return () => {
	// 			// Do something when the screen is unfocused
	// 			// Useful for cleanup functions
	// 		};
	// 	}, []),
	// );

	return (
		<View className="bg-white rounded-xl shadow-md mb-4">
			<View className=" px-4 py-1 rounded-tl-xl rounded-tr-xl">
				<View className="flex flex-row items-center gap-x-3 py-2">
					<View className="h-11 w-11">
						<Image
							source={
								user?.profilePhotoUrl
									? { uri: user?.profilePhotoUrl }
									: require('../../assets/icons/iconsLogin/blank-user-photo.jpg')
							}
							className="w-full h-full rounded-full"
							resizeMode="cover"
						/>
					</View>

					<View className="gap-x-1 flex-row justify-between items-center">
						<Text
							className="text-sm"
							style={{ fontFamily: 'poppins-semi-bold' }}
						>
							{user?.nome || 'Autor desconhecido'}
						</Text>

						{user?.isMonitor && (
							<View className="flex-row gap-x-1">
								<Ionicons name="diamond-outline" size={14} color="black" />
								<Text
									className="text-xs"
									style={{
										fontFamily: 'poppins-semi-bold',
									}}
								>
									Especialista
								</Text>
							</View>
						)}
					</View>
				</View>
			</View>

			<View className="h-[430px] w-[430px] self-center w-full">
				{imageUrl ? (
					<Image
						source={{ uri: imageUrl.url }}
						className="w-full h-full"
						resizeMode="cover"
					/>
				) : (
					<Text className="text-center">Imagem não disponível</Text>
				)}
			</View>

			<View className="mx-3 mt-4 space-y-1">
				<Text
					className="text-2xl text-[#000000]"
					style={{ fontFamily: 'poppins-semi-bold' }}
				>
					{post.titulo || 'Sem título'}
				</Text>

				<Text
					numberOfLines={isExpanded ? undefined : MAX_LINES}
					className="whitespace-normal w-full text-start mt-2.5 leading-6 text-[#333232]"
					style={{ fontFamily: 'poppins-medium' }}
				>
					{post.conteudo || 'Sem descrição'}
				</Text>

				{post.conteudo && post.conteudo.length > 100 && (
					<TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
						<Text className="mt-2" style={{ fontFamily: 'poppins-medium' }}>
							{isExpanded ? 'Ver menos' : 'Ver mais'}
						</Text>
					</TouchableOpacity>
				)}
			</View>
			<View className="h-[2px] bg-gray-200 w-full mt-4" />
		</View>
	);
};

export default PostComponent;
