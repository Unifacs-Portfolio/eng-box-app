import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import axios from "axios";
import { getApiAxios } from "../../services/axios";
import { Dica, Dicas, Especialist } from "../../utils/types/post";

const EspecialistHint = () => {
  const [hints, setHints] = useState<Dica[]>([]);
  const [loading, setLoading] = useState(false);

  // Função para buscar dados da API
  const fetchHints = async () => {
    try {
      setLoading(true);
      const api = await getApiAxios();
      const { data } = await api.get<Dicas>("/api/dicas");
      // Filtrar as dicas pelo parâmetro IsCreatedBySpecialist
      const filteredHints = data.dicas.filter(
        (hint: Dica) => hint.isCreatedBySpecialist === true
      );
      setHints(filteredHints); // Atualiza a lista de dicas
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
        {/* <Text
          className="text-[#4A4A4A] text-base"
          style={{ fontFamily: "poppins-medium" }}
        ></Text> */}
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
          keyExtractor={(item, index) => index.toString()}
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

export default EspecialistHint;
