import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import PostComponent from "../../Components/posts/home";
import { getApiAxios } from "../../services/axios";
import { getToken } from "../../utils/session/manager";
import { NavigationProp } from "../../utils/types/navigation";
import { Post } from "../../utils/types/post";
import Spinner from "../../Components/spinner";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Receita, ReceitasResponse } from "../../utils/types/receitas";
import { useUser } from "../../Components/profile/UserContext";

const Home = () => {
  const [posts, setPosts] = useState<Receita[]>([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NavigationProp>();
  const { userProfile } = useUser();

  const fetchPosts = async () => {
    try {
      const api = await getApiAxios();
      setLoading(true);
      const { data } = await api.get<ReceitasResponse>("/api/receitas");
      // const sortedPosts = data.sort(
      //   (a: Post, b: Post) =>
      //     new Date(b.dataCriacao).getTime() - new Date(a.dataCriacao).getTime()
      // );
      // console.log(sortedPosts);
      setPosts(data.receitas);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
      Alert.alert("Erro", "Não foi possível carregar as Postagens");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    React.useCallback(() => {
      // Do something when the screen is focused
      (async () => {
        const token = await getToken();
        if (!token) {
          alert("Você precisa realizar o Login para acessar!");
          navigation.navigate("Login");
          return;
        }

        await fetchPosts();
      })();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  const renderPost = ({ item }: { item: Receita }) => (
    <View className="mb-8">
      <PostComponent post={item} />
    </View>
  );

  if (loading) return <Spinner />;

  return (
    <View className="flex-1 space-y-2 pt-4 bg-white">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPost}
        ListHeaderComponent={<HomeHeader username={userProfile.nome} />}
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
              source={require("../../assets/images/login/LogoAppHome.png")}
            />

            <TouchableOpacity
              className="mr-4"
              onPress={() => navigation.navigate("Menu")}
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
