import api from './api';

// Tipos para as interfaces
export interface Usuario {
  id: number;
  nome: string;
  email: string;
  criado_em: string;
}

export interface CreateUsuario {
  nome: string;
  email: string;
  senha: string;
}

export interface LoginData {
  email: string;
  senha: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: Usuario;
    token: string;
    refreshToken: string;
  };
  message: string;
}

// Serviços de autenticação
export const authService = {
  async login(credentials: LoginData): Promise<AuthResponse> {
    console.log('🔐 Enviando login:', { email: credentials.email, senhaLength: credentials.senha?.length });
    const response = await api.post('/auth/login', credentials);
    console.log('✅ Resposta do login:', response.data);
    return response.data;
  },

  async register(userData: CreateUsuario): Promise<AuthResponse> {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  async logout(): Promise<void> {
    await api.post('/auth/logout');
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  },

  async refreshToken(refreshToken: string): Promise<{ token: string }> {
    const response = await api.post('/auth/refresh', { refreshToken });
    return response.data;
  },

  async getCurrentUser(): Promise<Usuario> {
    const response = await api.get('/auth/me');
    return response.data.data;
  },
};

// Serviços de usuários
export const usuarioService = {
  async getAll(): Promise<Usuario[]> {
    const response = await api.get('/usuarios');
    return response.data.data;
  },

  async getById(id: number): Promise<Usuario> {
    const response = await api.get(`/usuarios/${id}`);
    return response.data.data;
  },

  async create(userData: CreateUsuario): Promise<Usuario> {
    const response = await api.post('/usuarios', userData);
    return response.data.data;
  },

  async update(id: number, userData: Partial<CreateUsuario>): Promise<Usuario> {
    const response = await api.put(`/usuarios/${id}`, userData);
    return response.data.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/usuarios/${id}`);
  },
};

const services = { authService, usuarioService };

export default services;
