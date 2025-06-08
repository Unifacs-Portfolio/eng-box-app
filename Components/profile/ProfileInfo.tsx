import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getConsumerLevel } from '../../utils/getConsumerLevel';
import { userStore } from '../../utils/stores/user';
import { User } from '../../utils/types/user';
import { UserResponse } from '../../utils/types/user-response';
import { UserProfile } from '../../utils/types/UserProfile';

type ProfileInfoProps = {
	user: UserProfile;
};

const ProfileInfo = ({ user }: ProfileInfoProps) => {
	return (
		<View className="ml-4 mt-4 self-start ">
			<View className="flex-row items-center">
				<Ionicons name="person-sharp" size={25} color="#767676" />
				<Text
					className="text-base text-[#767676] ml-2"
					style={{ fontFamily: 'poppins-medium' }}
				>
					{user.nome}
				</Text>
			</View>

			<View className="flex-row items-center mt-2">
				<Image
					source={require('../../assets/icons/user-pages-icons/user-info/level-icon-2.png')}
					className="w-6 h-6 mr-2"
				/>
				<Text
					className="text-base text-[#7CC77F]"
					style={{ fontFamily: 'poppins-medium' }}
				>
					{getConsumerLevel(user.nivelConsciencia)}
				</Text>
			</View>
		</View>
	);
};

export default ProfileInfo;
