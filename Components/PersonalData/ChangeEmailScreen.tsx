import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { SafeAreaView, Text, TextInput, View } from 'react-native';
import { userStore } from '../../utils/stores/user';
import GoBackButton from '../GoBackButton';
import { useUser } from '../profile/UserContext';
import HandleSaveButton from './HandleSaveButton';
import SuccessModal from './SuccessModal';
import { getApiAxios } from '../../services/axios';

const ChangeEmailScreen = () => {
	// const user = userStore.getState().user;
	const { setUserProfile, userProfile } = useUser();

	const {
		control,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm({
		defaultValues: {
			email: userProfile?.email ?? '',
		},
	});

	const [isChanged, setIsChanged] = React.useState(false);
	const [modalVisible, setModalVisible] = React.useState(false);

	// const isEmailTaken = async (email: string) => {
	// 	const response = await fetch(``);
	// 	const data = await response.json();
	// 	return data.isTaken;
	// };

	const onSubmit = async (data: { email: string }) => {
		const api = await getApiAxios();

		// Busca todos os usuários
		const response = await api.get('/api/usuarios');
		const usuarios = response.data;

		// Verifica se já existe o email (ignorando o próprio usuário)
		const emailJaExiste = usuarios.some(
			(u: any) => u.email === data.email && u.email !== userProfile.email,
		);

		if (emailJaExiste) {
			setError('email', {
				type: 'manual',
				message: 'Este email já está em uso.',
			});
			return;
		}

		await api.put(`/api/usuario/alterar/${userProfile.email}`, {
			email: data.email,
		});
		// Atualize o contexto do usuário
		setUserProfile({ ...userProfile, email: data.email });
		setIsChanged(false);
		setModalVisible(true);

		setTimeout(() => setModalVisible(false), 1000);
	};

	return (
		<SafeAreaView className="flex-1 mt-4">
			<GoBackButton title="Email" />
			<Text
				className="text-sm text-[#767676] ml-9 mt-8 mb-2"
				style={{ fontFamily: 'poppins-medium' }}
			>
				Para alterar o email, clique aqui
			</Text>
			<View className="flex items-center flex-1">
				<View className="flex-row w-10/12 h-14 items-center border-2 rounded-xl border-[#767676] pl-2">
					<Ionicons name="mail" size={30} color={'#76767670'} />
					<Controller
						control={control}
						name="email"
						rules={{
							required: 'Email é obrigatório',
							minLength: {
								value: 3,
								message: 'O email deve ter pelo menos três letras',
							},
							maxLength: {
								value: 51,
								message: 'O email deve ter no máximo 51 letras',
							},
							pattern: {
								value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
								message: 'Formato de email inválido',
							},
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								value={value}
								placeholder="Digite o email"
								onChangeText={(text) => {
									onChange(text);
									setIsChanged(text !== userProfile?.email);
								}}
								onBlur={onBlur}
								className="w-11/12 h-full pl-2 text-[#767676] text-base"
								style={{ fontFamily: 'poppins-medium' }}
							/>
						)}
					/>
				</View>

				{errors.email && (
					<Text
						className="text-red-500 text-justify"
						style={{ fontFamily: 'poppins-regular' }}
					>
						{errors.email.message}
					</Text>
				)}

				<HandleSaveButton
					onPress={handleSubmit(onSubmit)}
					isChanged={isChanged}
				/>
			</View>

			<SuccessModal
				visible={modalVisible}
				onClose={() => setModalVisible(false)}
			/>
		</SafeAreaView>
	);
};

export default ChangeEmailScreen;
