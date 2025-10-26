import api from './api';

export interface Estoque {
  id: number;
  imovel_id: number;
  nome_item: string;
  categoria?: string;
  quantidade: number;
  unidade?: string;
  data_validade?: string;
  precisa_repor: boolean;
  criado_em: string;
  imovel_nome?: string;
}

export interface CreateEstoque {
  imovel_id: number;
  nome_item: string;
  categoria?: string;
  quantidade?: number;
  unidade?: string;
  data_validade?: string;
  precisa_repor?: boolean;
}

export interface EstoqueResumo {
  total_itens: number;
  itens_precisam_repor: number;
  itens_zerados: number;
  itens_vencidos: number;
  itens_vencendo_em_7_dias: number;
  total_categorias: number;
}

export const estoqueService = {
  async getAll(filters?: { imovel_id?: number; categoria?: string; precisa_repor?: boolean }): Promise<Estoque[]> {
    const params = new URLSearchParams();
    if (filters?.imovel_id) params.append('imovel_id', filters.imovel_id.toString());
    if (filters?.categoria) params.append('categoria', filters.categoria);
    if (filters?.precisa_repor !== undefined) params.append('precisa_repor', filters.precisa_repor.toString());
    
    const response = await api.get(`/estoque?${params.toString()}`);
    return response.data.data;
  },

  async getById(id: number): Promise<Estoque> {
    const response = await api.get(`/estoque/${id}`);
    return response.data.data;
  },

  async getByImovel(imovelId: number, filters?: { categoria?: string; precisa_repor?: boolean }): Promise<Estoque[]> {
    const params = new URLSearchParams();
    if (filters?.categoria) params.append('categoria', filters.categoria);
    if (filters?.precisa_repor !== undefined) params.append('precisa_repor', filters.precisa_repor.toString());
    
    const queryString = params.toString();
    const response = await api.get(`/estoque/imovel/${imovelId}${queryString ? `?${queryString}` : ''}`);
    return response.data.data;
  },

  async getCategorias(imovelId: number): Promise<string[]> {
    const response = await api.get(`/estoque/categorias/${imovelId}`);
    return response.data.data;
  },

  async getResumo(imovelId: number): Promise<EstoqueResumo> {
    const response = await api.get(`/estoque/resumo/${imovelId}`);
    return response.data.data;
  },

  async create(estoqueData: CreateEstoque): Promise<Estoque> {
    const response = await api.post('/estoque', estoqueData);
    return response.data.data;
  },

  async update(id: number, estoqueData: Partial<CreateEstoque>): Promise<Estoque> {
    const response = await api.put(`/estoque/${id}`, estoqueData);
    return response.data.data;
  },

  async updateQuantidade(id: number, quantidade: number): Promise<Estoque> {
    const response = await api.put(`/estoque/${id}/quantidade`, { quantidade });
    return response.data.data;
  },

  async marcarReposicao(id: number, precisaRepor: boolean = true): Promise<Estoque> {
    const response = await api.put(`/estoque/${id}/marcar-reposicao`, { precisa_repor: precisaRepor });
    return response.data.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/estoque/${id}`);
  },
};

export default estoqueService;
