import api from './api';

export interface Imovel {
  id: number;
  nome: string;
  endereco?: string;
  tipo?: string;
  criado_em: string;
  total_usuarios?: number;
}

export interface CreateImovel {
  nome: string;
  endereco?: string;
  tipo?: string;
}

export interface UsuarioImovel {
  usuario_id: number;
  imovel_id: number;
  papel: string;
}

export const imovelService = {
  async getAll(): Promise<Imovel[]> {
    const response = await api.get('/imoveis');
    return response.data.data;
  },

  async getById(id: number): Promise<Imovel> {
    const response = await api.get(`/imoveis/${id}`);
    return response.data.data;
  },

  async getByUsuario(usuarioId: number): Promise<Imovel[]> {
    const response = await api.get(`/imoveis/usuario/${usuarioId}`);
    return response.data.data;
  },

  async create(imovelData: CreateImovel): Promise<Imovel> {
    const response = await api.post('/imoveis', imovelData);
    return response.data.data;
  },

  async update(id: number, imovelData: Partial<CreateImovel>): Promise<Imovel> {
    const response = await api.put(`/imoveis/${id}`, imovelData);
    return response.data.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/imoveis/${id}`);
  },

  async addUsuario(imovelId: number, usuarioId: number, papel: string = 'morador'): Promise<UsuarioImovel> {
    const response = await api.post(`/imoveis/${imovelId}/usuarios`, {
      usuario_id: usuarioId,
      papel
    });
    return response.data.data;
  },

  async removeUsuario(imovelId: number, usuarioId: number): Promise<void> {
    await api.delete(`/imoveis/${imovelId}/usuarios/${usuarioId}`);
  },
};

export default imovelService;
