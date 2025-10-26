import api from './api';

export interface Conta {
  id: number;
  imovel_id: number;
  descricao: string;
  valor: number;
  data_vencimento: string;
  data_pagamento?: string;
  status: 'pendente' | 'pago';
  comprovante_url?: string;
  usuario_pagou_id?: number;
  criado_em: string;
  imovel_nome?: string;
  usuario_pagou_nome?: string;
}

export interface CreateConta {
  imovel_id: number;
  descricao: string;
  valor: number;
  data_vencimento: string;
  data_pagamento?: string;
  status?: 'pendente' | 'pago';
  comprovante_url?: string;
  usuario_pagou_id?: number;
}

export interface ContaResumo {
  total_contas: number;
  contas_pendentes: number;
  contas_pagas: number;
  valor_pendente: number;
  valor_pago: number;
  valor_total: number;
}

export const contaService = {
  async getAll(filters?: { imovel_id?: number; status?: string }): Promise<Conta[]> {
    const params = new URLSearchParams();
    if (filters?.imovel_id) params.append('imovel_id', filters.imovel_id.toString());
    if (filters?.status) params.append('status', filters.status);
    
    const response = await api.get(`/contas?${params.toString()}`);
    return response.data.data;
  },

  async getById(id: number): Promise<Conta> {
    const response = await api.get(`/contas/${id}`);
    return response.data.data;
  },

  async getByImovel(imovelId: number, status?: string): Promise<Conta[]> {
    const params = status ? `?status=${status}` : '';
    const response = await api.get(`/contas/imovel/${imovelId}${params}`);
    return response.data.data;
  },

  async getResumo(imovelId: number): Promise<ContaResumo> {
    const response = await api.get(`/contas/resumo/${imovelId}`);
    return response.data.data;
  },

  async create(contaData: CreateConta): Promise<Conta> {
    const response = await api.post('/contas', contaData);
    return response.data.data;
  },

  async update(id: number, contaData: Partial<CreateConta>): Promise<Conta> {
    const response = await api.put(`/contas/${id}`, contaData);
    return response.data.data;
  },

  async marcarComoPaga(id: number, usuarioPagouId?: number, comprovanteUrl?: string): Promise<Conta> {
    const response = await api.put(`/contas/${id}/pagar`, {
      usuario_pagou_id: usuarioPagouId,
      comprovante_url: comprovanteUrl
    });
    return response.data.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/contas/${id}`);
  },
};

export default contaService;
