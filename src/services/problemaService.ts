import api from './api';

export interface Problema {
  id: number;
  imovel_id: number;
  descricao: string;
  prioridade: 'baixa' | 'média' | 'alta';
  status: 'pendente' | 'resolvido';
  usuario_id?: number;
  data_criacao: string;
  data_resolucao?: string;
  imovel_nome?: string;
  usuario_nome?: string;
}

export interface CreateProblema {
  imovel_id: number;
  descricao: string;
  prioridade?: 'baixa' | 'média' | 'alta';
  status?: 'pendente' | 'resolvido';
  usuario_id?: number;
}

export interface ProblemaResumo {
  total_problemas: number;
  problemas_pendentes: number;
  problemas_resolvidos: number;
  problemas_alta_prioridade: number;
  problemas_media_prioridade: number;
  problemas_baixa_prioridade: number;
}

export const problemaService = {
  async getAll(filters?: { imovel_id?: number; status?: string; prioridade?: string }): Promise<Problema[]> {
    const params = new URLSearchParams();
    if (filters?.imovel_id) params.append('imovel_id', filters.imovel_id.toString());
    if (filters?.status) params.append('status', filters.status);
    if (filters?.prioridade) params.append('prioridade', filters.prioridade);
    
    const response = await api.get(`/problemas?${params.toString()}`);
    return response.data.data;
  },

  async getById(id: number): Promise<Problema> {
    const response = await api.get(`/problemas/${id}`);
    return response.data.data;
  },

  async getByImovel(imovelId: number, filters?: { status?: string; prioridade?: string }): Promise<Problema[]> {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.prioridade) params.append('prioridade', filters.prioridade);
    
    const queryString = params.toString();
    const response = await api.get(`/problemas/imovel/${imovelId}${queryString ? `?${queryString}` : ''}`);
    return response.data.data;
  },

  async getResumo(imovelId: number): Promise<ProblemaResumo> {
    const response = await api.get(`/problemas/resumo/${imovelId}`);
    return response.data.data;
  },

  async create(problemaData: CreateProblema): Promise<Problema> {
    const response = await api.post('/problemas', problemaData);
    return response.data.data;
  },

  async update(id: number, problemaData: Partial<CreateProblema>): Promise<Problema> {
    const response = await api.put(`/problemas/${id}`, problemaData);
    return response.data.data;
  },

  async marcarComoResolvido(id: number): Promise<Problema> {
    const response = await api.put(`/problemas/${id}/resolver`);
    return response.data.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/problemas/${id}`);
  },
};

export default problemaService;
