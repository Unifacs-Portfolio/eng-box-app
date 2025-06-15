import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
// import { getUserDetails } from "../../utils/session/user-data";
import { UserProfile } from "../../utils/types/UserProfile";
import { UserResponse } from "../../utils/types/user-response";
import { decryptToken, getToken } from "../../utils/session/manager";
import { getApiAxios } from "../../services/axios";

interface UserContextProps {
  userProfile: UserResponse;
  setUserProfile: React.Dispatch<React.SetStateAction<UserResponse>>;
  getUserDetails: () => Promise<UserResponse | undefined>;
  getUsersByID: (userId: string) => Promise<UserResponse | undefined>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userProfile, setUserProfile] = useState<UserResponse>(
    {} as UserResponse
  );

  const getUserDetails = async () => {
    const token = await getToken();
    try {
      if (!token) return;
      const payloadToken = await decryptToken(token);
      if (!payloadToken) return;
      const axios = await getApiAxios();
      const { data } = await axios.get(`/api/usuario/${payloadToken.userID}`);

      const userFormated: UserResponse = {
        id: data.user.id,
        email: data.user.email,
        fotoUsu: data.user.foto_usuario,
        isMonitor: data.user.is_monitor,
        nivelConsciencia: Number(data.user.nivel_consciencia),
        nome: data.user.nome,
        telefone: data.user.telefone,
      };

      setUserProfile(userFormated);
      return userFormated;
    } catch (error: any) {
      console.error("Erro inesperado: ", error);
    }
  };
  const getUsersByID = async (userId: string) => {
    try {
      const axios = await getApiAxios();
      const { data } = await axios.get(`/api/usuario/${userId}`);
      return data.user;
    } catch (error: any) {
      // console.error("Erro inesperado: ", error);
    }
    return;
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  //   useEffect(() => {
  //     (async () => {
  //     //   await getUserDetails();
  //       //   if (user) {
  //       //     setUserProfile((state) => {
  //       //       return {
  //       //         ...state,
  //       //         email: user.email,
  //       //         nome: user.nome,
  //       //         telefone: user.telefone,
  //       //         isMonitor: user.isMonitor,
  //       //         fotoUsu: user.fotoUsu,
  //       //       };
  //       //     });
  //       //   }
  //     })();
  //   }, []);

  return (
    <UserContext.Provider
      value={{ userProfile, setUserProfile, getUserDetails, getUsersByID }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("userUser must be used within a UserProvider");
  }
  return context;
};
