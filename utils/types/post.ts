export interface Foto {
  uri: string;
  name: string;
  type: string;
}
export interface Post {
  id: number;
  idUsuario: string;
  dataCriacao: string;
  titulo: string;
  tema: string;
  subtemas: string;
  conteudo: string;
  fotos: Foto[];
}

export interface Especialist {
  titulo: string;
  conteudo: string;
  tema: string;
  subtemas: string;
  usuarioId: string;
  IsCreatedBySpecialist: boolean;
}

export type Dica = {
  id: string;
  titulo: string;
  conteudo: string;
  isVerify: boolean;
  usuarioId: string;
  verifyBy: string | null;
  createdAt: string; // Ou Date, se for ser convertido
  updatedAt: string; // Ou Date, se for ser convertido
  tema: string;
  subtemas: string[];
  isCreatedBySpecialist: boolean;
};

export type Dicas = {
  dicas: Dica[];
};
