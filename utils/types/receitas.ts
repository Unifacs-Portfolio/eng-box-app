export type Ingrediente = {
  id: string;
  receita_id: string;
  quantidade: string;
  medida: string;
  nome: string;
};

export type Receita = {
  id: string;
  titulo: string;
  conteudo: string;
  isVerify: boolean;
  usuarioId: string;
  tema: string;
  subtemas: string[];
  ingredientes: Ingrediente[];
  fotos: string | null;
};

export type ReceitasResponse = {
  receitas: Receita[];
};
