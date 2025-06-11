import React from 'react';
import { Linking, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface AboutTextBoxProps {
	iconName?: string;
	iconSize?: number;
	boxTitle?: string;
	boxTextContent: string;
}

interface Developer {
	name: string;
	linkedInUrl: string;
}

const developers: Developer[] = [
	{
		name: 'Edioelson Júnior A. B. Teixeira',
		linkedInUrl: 'https://www.linkedin.com/in/developeredd/',
	},
	{
		name: 'Gabriel Silva Magalhães',
		linkedInUrl: 'https://www.linkedin.com/in/gabriel-smagalhaes32/',
	},
	{
		name: 'Hanspeter Dietiker',
		linkedInUrl: 'https://www.linkedin.com/in/hanspeterdietiker/',
	},
	{
		name: 'Enzo Colombo',
		linkedInUrl: 'https://www.linkedin.com/in/enzo-contieri-b1578326b/',
	},
	{
		name: 'Arthur Victor Vitoriano',
		linkedInUrl: 'https://www.linkedin.com/',
	},
	{
		name: 'Lucas Costa',
		linkedInUrl: 'https://www.linkedin.com/',
	},
	{
		name: 'Vitor Vitoriano',
		linkedInUrl: 'https://www.linkedin.com/',
	},
	{
		name: 'Yago Mário',
		linkedInUrl: 'https://www.linkedin.com/',
	},
];

const DeveloperItem = ({ name, linkedInUrl }: Developer) => {
	const handlePress = () => {
		Linking.openURL(linkedInUrl).catch();
	};

	return (
		<View className="flex-row items-center my-1">
			<Text
				className="text-base text-[#767676]"
				style={{ fontFamily: 'poppins-medium' }}
			>
				• {name}
			</Text>
			<TouchableOpacity onPress={handlePress} className="ml-2">
				<Ionicons name="logo-linkedin" size={20} color="#767676" />
			</TouchableOpacity>
		</View>
	);
};

export const AboutDevsBox = () => {
	return (
		<View className="bg-white w-11/12 p-3 rounded-lg shadow-md mb-4">
			<View className="flex-row items-center gap-2">
				<Ionicons name="code-slash" size={30} color={'#767676'} />
				<Text
					className="text-xl text-[#767676]"
					style={{ fontFamily: 'poppins-semi-bold' }}
				>
					Desenvolvedores
				</Text>
			</View>

			<View className="mt-2.5 px-2">
				{developers.map((dev, index) => (
					<DeveloperItem
						key={index}
						name={dev.name}
						linkedInUrl={dev.linkedInUrl}
					/>
				))}
			</View>
		</View>
	);
};

export const AboutTextBox = ({
	iconName,
	iconSize,
	boxTitle,
	boxTextContent,
}: AboutTextBoxProps) => {
	return (
		<View className="bg-white w-11/12 p-3 rounded-lg shadow-md mb-4">
			<View className="flex-row items-center gap-2">
				{iconName && (
					<Ionicons name={iconName} size={iconSize} color={'#767676'} />
				)}

				{boxTitle && (
					<Text
						className="text-xl text-[#767676] "
						style={{ fontFamily: 'poppins-semi-bold' }}
					>
						{boxTitle}
					</Text>

				)}
			</View>
			<Text
				className="w-full text-justify self-start text-base px-2 my-2 text-[#767676] mt-2.5 min-h-full"
				style={{ fontFamily: 'poppins-medium' }}
			>
				{boxTextContent}
			</Text>
		</View>
	);
};
