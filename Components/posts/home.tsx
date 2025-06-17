import { useFocusEffect } from "@react-navigation/native";
import React, { useMemo, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { getUserDetailsByEmail } from "../../utils/session/user-data";
import { Post } from "../../utils/types/post";
import { UserResponse } from "../../utils/types/user-response";
import { Ionicons } from "@expo/vector-icons";
import { Receita } from "../../utils/types/receitas";
import { getApiAxios } from "../../services/axios";
import { useUser } from "../profile/UserContext";
type PostProps = {
  post: Receita;
};

const PostComponent = ({ post }: PostProps) => {
  // console.log(imageUrl);
  const [userPost, setUserPost] = useState<UserResponse | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const { getUsersByID } = useUser();
  const MAX_LINES = 3;

  // Retirar quando a api tiver funcionando
  const randomImageSeed = useMemo(
    () => Math.floor(Math.random() * 1000) + 1,
    []
  );

  useFocusEffect(
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    React.useCallback(() => {
      // Do something when the screen is focused
      (async () => {
        const data = await getUsersByID(post.usuarioId);
        if (!data) return;
        setUserPost(data);
      })();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [post.usuarioId])
  );
  // if (!post.fotos) return null;
  // const fotosArray = JSON.parse(post.fotos);
  // console.log(fotosArray);
  // const imageUrl = fotosArray[0];
  // console.log(imageUrl);

  const fotosString = post.fotos || "[]";
  let imageUrl: string | null = null;
  try {
    const parsed = JSON.parse(fotosString);
    // Se for array e tiver pelo menos uma imagem, pega a primeira
    if (
      Array.isArray(parsed) &&
      parsed.length > 0 &&
      typeof parsed[0] === "string"
    ) {
      imageUrl = parsed[0];
    } else if (typeof parsed === "string") {
      imageUrl = parsed;
    }
  } catch {
    imageUrl = null;
  }

  return (
    <View className="bg-white rounded-xl shadow-md mb-4">
      <View className=" px-4 py-1 rounded-tl-xl rounded-tr-xl">
        <View className="flex flex-row items-center gap-x-3 py-2">
          <View className="h-11 w-11">
            <Image
              source={
                userPost?.foto_usuario
                  ? { uri: userPost?.foto_usuario }
                  : { uri: `https://cataas.com/cat?id=${randomImageSeed}` }
              }
              className="w-full h-full rounded-full"
              resizeMode="cover"
            />
          </View>

          <View className="gap-x-1 flex-row justify-between items-center">
            <Text
              className="text-sm"
              style={{ fontFamily: "poppins-semi-bold" }}
            >
              {userPost?.nome || "autor desconhecido"}
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
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            className="w-full h-full"
            resizeMode="cover"
          />
        ) : (
          <Text className="text-center">Imagem não disponível</Text>
        )}
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
