import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, View } from 'react-native';
import { ConsumerOptions } from '../../utils/enums/consumer';
import { getConsumerLevel } from '../../utils/getConsumerLevel';
import { getLevesTree } from '../../utils/getLevelsTree';
import { UserResponse } from '../../utils/types/user-response';
import { useUser } from './UserContext';
import { UserProfile } from '../../utils/types/UserProfile';
import { getUserDetails } from '../../utils/session/user-data';

type ProfileImagesSectionProps = {
	user: UserProfile;
};

const ProfileImagesSection = ({ user }: ProfileImagesSectionProps) => {
	const [consumerLevel, setConsumerLevel] = useState(
		getConsumerLevel(user?.nivelConsciencia),
	);
	return (
		<View className="items-center justify-center">
			<View className="relative w-40 h-40 rounded-full items-center justify-center shadow-sm">
				{user?.profilePhotoUrl ? (
					<Image
						source={{ uri: user?.profilePhotoUrl }}
						className="w-full h-full rounded-full"
					/>
				) : (
					<Ionicons name="person" size={100} color="#ccc" />
				)}
				<View className="absolute bottom-0 right-[-2px] bg-white rounded-full">
					<Image
						source={
							getLevesTree(consumerLevel ?? ConsumerOptions.beginner)
								?.imageSource
						}
						className="w-12 h-12"
					/>
				</View>
			</View>
		</View>
	);
};

export default ProfileImagesSection;
