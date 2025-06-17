import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { SafeAreaView, Text, TextInput, View } from "react-native";
import { userStore } from "../../utils/stores/user";
import GoBackButton from "../GoBackButton";
import { useUser } from "../profile/UserContext";
import HandleSaveButton from "./HandleSaveButton";
import SuccessModal from "./SuccessModal";
import { getApiAxios } from "../../services/axios";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../../utils/types/navigation";

const ChangeEmailScreen = () => {
  const { userProfile, setUserProfile, getUserDetails } = useUser();
  const navigation = useNavigation<NavigationProp>();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      email: userProfile?.email ?? "",
    },
  });

  const [isChanged, setIsChanged] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);

  const onSubmit = async (data: { email: string }) => {
    try {
      const api = await getApiAxios();
      const { data: email } = await api.put(`/api/usuario/${userProfile.id}`, {
        email: data.email,
      });
      setUserProfile((prevUserProfile) => ({
        ...prevUserProfile,
        email: email,
      }));
      setIsChanged(false);
      setModalVisible(true);

      setTimeout(() => setModalVisible(false), 2000);
      navigation.navigate("PersonalData");
    } catch (error) {
      alert(
        "Erro ao tentar mudar o email, tente outro email ou volte mais tarde"
      );
    }
  };

  return (
    <SafeAreaView className="flex-1 mt-4">
      <GoBackButton title="Email" />
      <Text
        className="text-sm text-[#767676] ml-9 mt-8 mb-2"
        style={{ fontFamily: "poppins-medium" }}
      >
        Para alterar o email, clique aqui
      </Text>
      <View className="flex items-center flex-1">
        <View className="flex-row w-10/12 h-14 items-center border-2 rounded-xl border-[#767676] pl-2">
          <Ionicons name="mail" size={30} color={"#76767670"} />
          <Controller
            control={control}
            name="email"
            rules={{
              required: "Email é obrigatório",
              minLength: {
                value: 3,
                message: "O email deve ter pelo menos três letras",
              },
              maxLength: {
                value: 51,
                message: "O email deve ter no máximo 51 letras",
              },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Formato de email inválido",
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
                style={{ fontFamily: "poppins-medium" }}
              />
            )}
          />
        </View>

        {errors.email && (
          <Text
            className="text-red-500 text-justify"
            style={{ fontFamily: "poppins-regular" }}
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
