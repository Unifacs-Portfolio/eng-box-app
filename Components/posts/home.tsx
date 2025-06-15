import { useFocusEffect } from "@react-navigation/native";
import React, { useMemo, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { getUserDetailsByEmail } from "../../utils/session/user-data";
import { Post } from "../../utils/types/post";
import { UserResponse } from "../../utils/types/user-response";
import { Ionicons } from "@expo/vector-icons";
import { Receita } from "../../utils/types/receitas";
type PostProps = {
  post: Receita;
};

const PostComponent = ({ post }: PostProps) => {
  const imageUrl = post.fotos && post.fotos.length > 0 ? post.fotos[0] : "";
  const [userPost, setUserPost] = useState<UserResponse | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const MAX_LINES = 3;

  // Retirar quando a api tiver funcionando
  const randomImageSeed = useMemo(
    () => Math.floor(Math.random() * 1000) + 1,
    []
  );

  const nomes: string[] = [
    "Ana Silva",
    "Carlos Souza",
    "Mariana Lima",
    "Pedro Oliveira",
    "Julia Costa",
    "Lucas Rocha",
    "Fernanda Alves",
    "Rafael Martins",
  ];
  const randomNome = useMemo(() => {
    const indice = Math.floor(Math.random() * nomes.length);
    return nomes[indice];
  }, []);

  // useFocusEffect(
  //   // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  //   React.useCallback(() => {
  //     // Do something when the screen is focused
  //     (async () => {
  //       // const user = await getUserDetailsByEmail(post.usuarioId);
  //       // setUserPost(user);
  //     })();
  //     return () => {
  //       // Do something when the screen is unfocused
  //       // Useful for cleanup functions
  //     };
  //   }, [])
  // );

  return (
    <View className="bg-white rounded-xl shadow-md mb-4">
      <View className=" px-4 py-1 rounded-tl-xl rounded-tr-xl">
        <View className="flex flex-row items-center gap-x-3 py-2">
          <View className="h-11 w-11">
            {/* <Image
              source={
                userPost?.fotoUsu
                  ? { uri: userPost?.fotoUsu }
                  : require("../../assets/icons/iconsLogin/blank-user-photo.jpg")
              }
              className="w-full h-full rounded-full"
              resizeMode="cover"
            /> */}
            <Image
              source={{
                uri: `https://cataas.com/cat?id=${randomImageSeed}`,
              }}
              className="w-full h-full rounded-full"
              resizeMode="cover"
            />
          </View>

          <View className="gap-x-1 flex-row justify-between items-center">
            <Text
              className="text-sm"
              style={{ fontFamily: "poppins-semi-bold" }}
            >
              {/* Descomentar quando api tiver pronta
              {userPost?.nome || "Autor desconhecido"} */}
              {randomNome}
            </Text>

            {userPost?.isMonitor && (
              <View className="flex-row gap-x-1">
                <Ionicons name="diamond-outline" size={14} color="black" />
                <Text
                  className="text-xs"
                  style={{
                    fontFamily: "poppins-semi-bold",
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
        {/* Corrigir quando a api estiver 100% */}
        {/* {imageUrl ? (
          <Image
            source={{ uri: imageUrl as any }}
            className="w-full h-full"
            resizeMode="cover"
          />
        ) : (
          <Text className="text-center">Imagem não disponível</Text>
        )} */}
        <Image
          source={{
            uri: `https://picsum.photos/300/300?random=${randomImageSeed}`,
          }}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>

      <View className="mx-3 mt-4 space-y-1">
        <Text
          className="text-2xl text-[#767676]"
          style={{ fontFamily: "poppins-semi-bold" }}
        >
          {post.titulo || "Sem título"}
        </Text>

        <Text
          numberOfLines={isExpanded ? undefined : MAX_LINES}
          className="whitespace-normal w-full text-justify mt-2.5 leading-6 text-[#767676]"
          style={{ fontFamily: "poppins-medium" }}
        >
          {post.conteudo || "Sem descrição"}
        </Text>

        {post.conteudo && post.conteudo.length > 100 && (
          <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
            <Text className="mt-2" style={{ fontFamily: "poppins-medium" }}>
              {isExpanded ? "Ver menos" : "Ver mais"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <View className="h-[2px] bg-gray-200 w-full mt-4" />
    </View>
  );
};

export default PostComponent;
