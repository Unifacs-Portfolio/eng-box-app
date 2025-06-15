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
      const { data: res } = await axios.get(
        `/api/usuario/${payloadToken.email}`
      );

      const userFormated: UserResponse = {
        email: res.user.email,
        fotoUsu: res.user.foto_usuario,
        isMonitor: res.user.is_monitor,
        nivelConsciencia: Number(res.user.nivel_consciencia),
        nome: res.user.nome,
        telefone: res.user.telefone,
      };

      setUserProfile(userFormated);
      return userFormated;
    } catch (error: any) {
      console.log("Erro inesperado: ", error);
    }
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
      value={{ userProfile, setUserProfile, getUserDetails }}
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
