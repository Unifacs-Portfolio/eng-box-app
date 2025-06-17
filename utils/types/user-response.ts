export interface UserResponse {
  id?: string;
  nome: string;
  email: string;
  fotoUsu: string | null;
  isMonitor: boolean;
  nivelConsciencia: number;
  telefone: string;
  foto_usuario?: string;
}
