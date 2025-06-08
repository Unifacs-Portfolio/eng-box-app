import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
	Image,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import 'tailwindcss/tailwind.css';
import { Controller, useForm } from 'react-hook-form';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { axiosLogin } from '../../services/axios';
import {
	checkIsRemember,
	removeRememberMeData,
	storeRememberMeData,
} from '../../utils/async-storage/user-data';
import { getToken, saveToken } from '../../utils/session/manager';
import { LoginFormData } from '../../utils/types/form/formData';
import { NavigationProp } from '../../utils/types/navigation';
import { TokenResponse } from '../../utils/types/token';
import { useUser } from '../../Components/profile/UserContext';
import { UserProfile } from '../../utils/types/UserProfile';
import { getUserDetails } from '../../utils/session/user-data';

export default function Login() {
	const navigation = useNavigation<NavigationProp>();
	const [rememberMe, setRememberMe] = useState(false);
	const { control, handleSubmit, formState, reset } = useForm<LoginFormData>();
	const { isSubmitting } = formState;
	const { userProfile, setUserProfile } = useUser();

	const [showPassword, setShowPassword] = React.useState<boolean>(false);

	const handleLoginFormSubmit = async (data: LoginFormData) => {
		try {
			const response = await axiosLogin.post<UserProfile>(
				'/api/usuario/login',
				{
					email: data.email,
					senha: data.password,
				},
			);

			// await saveToken(tokenObject.token, tokenObject.email);
			setUserProfile(response.data);
			getUserDetails(response.data.email);

			if (rememberMe) {
				await storeRememberMeData();
			} else {
				await removeRememberMeData();
			}

			alert('Login realizado com sucesso!');
			reset();
			navigation.navigate('QuizPresentation');
		} catch (error: any) {
			if (error.response) {
				const { status, data: errorData } = error.response;
				if (status === 401) {
					alert('Senha incorreta. Por favor, tente novamente.');
				} else if (status === 404) {
					alert('Usuário não encontrado. Verifique o e-mail informado.');
				} else {
					alert(
						errorData?.message || 'Ocorreu um erro ao tentar realizar o login.',
					);
					console.error('Erro ao fazer login:', errorData);
				}
			} else if (error.request) {
				alert('Erro de conexão. Verifique sua internet.');
			} else {
				alert('Ocorreu um erro inesperado. Tente novamente mais tarde.');
			}
		}
	};

	useFocusEffect(
		// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
		React.useCallback(() => {
			(async () => {
				const isRemember = await checkIsRemember();
				const token = await getToken();
				if (isRemember && token) navigation.navigate('Main');
			})();
			return () => {
				// Do something when the screen is unfocused
				// Useful for cleanup functions
			};
		}, []),
	);

	return (
		<KeyboardAvoidingView
			className="flex-1"
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
		>
			<ScrollView className="bg-[#F9F9F9]">
				<View className=" justify-center items-center ">
					<View className="relative flex justify-center items-center  w-full h-64 mb-6">
						<Image
							source={require('../../assets/images/login/ImagemDeFundo.png')}
							className="absolute shadown top-0 left-0 w-full h-full bg-[#F9F9F9] object-cover"
						/>
						<View className="justify-center items-center">
							<Image
								source={require('../../assets/images/login/LogoDoApp.png')}
							/>
						</View>
					</View>

					<View className="flex w-4/5 items-center">
						{/*Wellcome*/}
						<Text
							style={{ fontFamily: 'poppins-bold' }}
							className="text-[#5A5A5A] mb-2 text-2xl ml-2"
						>
							Bem-vindo de Volta!
						</Text>
						<Text
							className="text-base text-[#767676] mb-2"
							style={{ fontFamily: 'poppins-medium' }}
						>
							Faça login na sua conta
						</Text>

						{/*Input User*/}

						<View className="w-full mb-6 h-24">
							<View className="flex-row items-center mb-2 mr-5 ">
								<Ionicons name="person-sharp" size={20} color={'#5A5A5A'} />

								<Text
									className="ml-1 text-[#5A5A5A] text-base"
									style={{ fontFamily: 'poppins-medium' }}
								>
									Email
								</Text>
							</View>

							<Controller
								control={control}
								name="email"
								rules={{
									required: 'O Email é obrigatorio',
									minLength: {
										value: 3,
										message: 'Este campo deve ter no minimo 3 caracteres',
									},
									maxLength: {
										value: 51,
										message: 'Limite excedido de caracteres',
									},
								}}
								render={({
									field: { value, onChange },
									fieldState: { error },
								}) => (
									<>
										<TextInput
											className="bg-[#EDEDED] border border-[#5B5B5B] shadow px-4 py-4 rounded-2xl "
											placeholder="Email"
											value={value}
											onChangeText={onChange}
											keyboardType="email-address"
											autoCapitalize="none"
										/>
										{error && (
											<Text
												style={{ fontFamily: 'poppins-semi-bold' }}
												className="text-[#ff375b] text-xs ml-2 mt-1"
											>
												{error.message}
											</Text>
										)}
									</>
								)}
							/>
						</View>

						{/*Input Password*/}
						<View className="w-full mb-6 h-24">
							<View className="flex-row items-center mb-2 mr-5 ">
								<Ionicons name="lock-closed" size={20} color={'#5A5A5A'} />
								<Text
									className="ml-1 text-[#5A5A5A] text-base"
									style={{ fontFamily: 'poppins-medium' }}
								>
									Senha
								</Text>
							</View>

							<Controller
								control={control}
								name="password"
								rules={{
									required: 'A senha é obrigatória',
									minLength: {
										value: 8,
										message: 'A senha deve ter pelo menos 8 caracteres',
									},
									maxLength: {
										value: 51,
										message: 'Limite excedido de caracteres',
									},
								}}
								render={({
									field: { value, onChange },
									fieldState: { error },
								}) => (
									<View className="w-full">
										<View className="flex-row items-center rounded-2xl pr-2 justify-between bg-[#EDEDED] border border-[#5B5B5B]">
											<TextInput
												className="rounded-2xl px-4 py-4 w-11/12"
												placeholder="Digite sua senha"
												value={value}
												onChangeText={onChange}
												secureTextEntry={!showPassword}
												autoCapitalize="none"
											/>
											<TouchableOpacity
												onPress={() => setShowPassword(!showPassword)}
												className="items-center justify-center"
											>
												<Ionicons
													name={showPassword ? 'eye-off' : 'eye'}
													size={24}
													color={'#5A5A5A'}
												/>
											</TouchableOpacity>
										</View>
										{error && (
											<Text
												style={{ fontFamily: 'poppins-semi-bold' }}
												className="text-[#ff375b] text-xs ml-2 mt-1"
											>
												{error.message}
											</Text>
										)}
									</View>
								)}
							/>
						</View>

						{/*Remember me and ForgotPassword */}
						<View className="w-full flex-row mb-6 items-center">
							<View className="flex-row items-center justify-between w-full">
								<View className="flex flex-row items-center gap-2">
									<TouchableOpacity
										className={`shadow-sm w-6 h-6 rounded-sm border-2 ${rememberMe ? 'bg-[#D9D9D9]' : 'bg-white border-[#D9D9D9]'}`}
										onPress={() => setRememberMe(!rememberMe)}
									>
										{rememberMe && (
											<View className="w-full h-full bg-[#5A5A5A]">
												<Ionicons
													name="checkbox-outline"
													size={20}
													color="white"
												/>
											</View>
										)}
									</TouchableOpacity>

									<Text
										className="text-[#767676]"
										style={{ fontFamily: 'poppins-regular' }}
									>
										Lembrar de Mim
									</Text>
								</View>
								<TouchableOpacity
									onPress={() => navigation.navigate('ForgotPassword')}
								>
									<Text
										className="shadow text-sm text-[#5A5A5A] underline"
										style={{ fontFamily: 'poppins-regular' }}
									>
										Esqueceu sua Senha?
									</Text>
								</TouchableOpacity>
							</View>
						</View>

						{/*Button Enter */}
						<TouchableOpacity
							className={'w-full bg-[#5A5A5A] shadow-lg py-4 mb-4 rounded-2xl'}
							onPress={handleSubmit(handleLoginFormSubmit)}
							disabled={isSubmitting}
						>
							<Text className="text-center text-white text-lg">Entrar</Text>
						</TouchableOpacity>

						{/*Link of Register */}
						<View className=" flex-row justify-center items-center mb-4">
							<View className="flex-row items-center">
								<Text
									className="text-[#767676]"
									style={{ fontFamily: 'poppins-medium' }}
								>
									Não tem uma Conta?
								</Text>
							</View>
							<TouchableOpacity
								className="shadow text-[#767676]"
								onPress={() => {
									navigation.navigate('Register');
									reset();
								}}
							>
								<Text
									className="text-[#5A5A5A] ml-1 underline"
									style={{ fontFamily: 'poppins-medium' }}
								>
									Registre-se
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}
