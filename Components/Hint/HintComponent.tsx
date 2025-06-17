import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { getApiAxios } from "../../services/axios";
// import Icon from "react-native-vector-icons/Ionicons";
import { Dica, Dicas } from "../../utils/types/post";

const HintComponent = () => {
  const [hints, setHints] = useState<Dica[]>();
  const [loading, setLoading] = useState(false);

  // Função para buscar dados da API
  const fetchHints = async () => {
    try {
      setLoading(true);
      const api = await getApiAxios();
      const { data } = await api.get<Dicas>("/api/Enge/dicas");

      // Ordenar as dicas por data de criação (mais recentes primeiro)
      // const sortedHints = response.data.sort((a, b) => {
      //   const dateA = new Date(a.dataCriacao).getTime();
      //   const dateB = new Date(b.dataCriacao).getTime();
      //   return dateB - dateA; // Ordem decrescente
      // });
      setHints(data.dicas);
    } catch (error) {
      console.error("Erro ao buscar dicas:", error);
    } finally {
      setLoading(false);
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    fetchHints();
  }, []);

  const renderHint = ({ item }: { item: Dica }) => (
    <View className="mx-[5%]">
      <View className="bg-white w-[100%] p-4 rounded-lg shadow mb-2 mt-2">
        <Text
          className="font-bold mb-2 text-lg text-[#4A4A4A]"
          style={{ fontFamily: "poppins-medium" }}
        >
          {item.titulo}
        </Text>
        <Text
          className="text-[#4A4A4A] text-sm"
          style={{ fontFamily: "poppins-medium", opacity: 0.7 }}
        >
          {item.conteudo}
        </Text>
      </View>
    </View>
  );

  return (
    <View>
      {loading ? (
        <View className="flex-1 items-center justify-center mt-44">
          <ActivityIndicator size="large" color="#4A4A4A" />
        </View>
      ) : (
        <FlatList
          data={hints}
          keyExtractor={(item) => item.id.toString()} // Use o `id` como chave
          renderItem={renderHint}
          nestedScrollEnabled
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 200 }}
          ListEmptyComponent={
            <View className="items-center justify-center mt-16">
              <Text
                className="text-[#4A4A4A] text-sm"
                style={{ fontFamily: "poppins-medium", opacity: 0.7 }}
              >
                Nenhuma dica encontrada.
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
};

export default HintComponent;
