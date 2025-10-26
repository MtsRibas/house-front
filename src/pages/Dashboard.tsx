import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { imovelService, Imovel } from '../services/imovelService';
import { contaService, ContaResumo } from '../services/contaService';
import { problemaService, ProblemaResumo } from '../services/problemaService';
import { estoqueService, EstoqueResumo } from '../services/estoqueService';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [imoveis, setImoveis] = useState<Imovel[]>([]);
  const [selectedImovel, setSelectedImovel] = useState<Imovel | null>(null);
  const [contaResumo, setContaResumo] = useState<ContaResumo | null>(null);
  const [problemaResumo, setProblemaResumo] = useState<ProblemaResumo | null>(null);
  const [estoqueResumo, setEstoqueResumo] = useState<EstoqueResumo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadImoveis();
  }, [user?.id]);

  useEffect(() => {
    if (selectedImovel) {
      loadResumos(selectedImovel.id);
    }
  }, [selectedImovel]);

  const loadImoveis = async () => {
    try {
      if (user?.id) {
        const data = await imovelService.getByUsuario(user.id);
        setImoveis(data);
        if (data.length > 0) {
          setSelectedImovel(data[0]);
        }
      }
    } catch (error) {
      console.error('Erro ao carregar imóveis:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadResumos = async (imovelId: number) => {
    try {
      const [contaData, problemaData, estoqueData] = await Promise.all([
        contaService.getResumo(imovelId),
        problemaService.getResumo(imovelId),
        estoqueService.getResumo(imovelId),
      ]);

      setContaResumo(contaData);
      setProblemaResumo(problemaData);
      setEstoqueResumo(estoqueData);
    } catch (error) {
      console.error('Erro ao carregar resumos:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="card">
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', margin: 0 }}>
          Olá, {user?.nome}! 
        </h1>
        <p style={{ margin: '8px 0 0 0', color: '#6b7280' }}>
          Bem-vindo ao seu painel de controle doméstico
        </p>
      </div>

      {/* Seletor de Imóvel */}
      {imoveis.length > 0 && (
        <div className="card">
          <h2 className="card-title">Selecione um imóvel</h2>
          <div className="imovel-grid">
            {imoveis.map((imovel) => (
              <button
                key={imovel.id}
                onClick={() => setSelectedImovel(imovel)}
                className={`imovel-card ${selectedImovel?.id === imovel.id ? 'selected' : ''}`}
              >
                <h3 className="imovel-name">{imovel.nome}</h3>
                <p className="imovel-address">{imovel.endereco}</p>
                <p className="imovel-type">{imovel.tipo}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Resumos */}
      {selectedImovel && (
        <div className="card-grid">
          {/* Resumo de Contas */}
          <div className="card-item">
            <div className="card-header">
              <div className="card-icon green">
                <span className="card-icon-text">💰</span>
              </div>
              <div className="card-info">
                <h3>Contas</h3>
                <p>{selectedImovel.nome}</p>
              </div>
            </div>
            <div className="card-stats">
              <div className="stat-item">
                <p>Pendentes</p>
                <p className="stat-value red">{contaResumo?.contas_pendentes || 0}</p>
              </div>
              <div className="stat-item">
                <p>Pagas</p>
                <p className="stat-value green">{contaResumo?.contas_pagas || 0}</p>
              </div>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>Valor Pendente</p>
              <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#111827', margin: 0 }}>
                R$ {contaResumo?.valor_pendente?.toFixed(2) || '0,00'}
              </p>
            </div>
            <Link to="/contas" className="card-link">
              Ver todas as contas →
            </Link>
          </div>

          {/* Resumo de Problemas */}
          <div className="card-item">
            <div className="card-header">
              <div className="card-icon yellow">
                <span className="card-icon-text">🔧</span>
              </div>
              <div className="card-info">
                <h3>Problemas</h3>
                <p>{selectedImovel.nome}</p>
              </div>
            </div>
            <div className="card-stats">
              <div className="stat-item">
                <p>Pendentes</p>
                <p className="stat-value red">{problemaResumo?.problemas_pendentes || 0}</p>
              </div>
              <div className="stat-item">
                <p>Resolvidos</p>
                <p className="stat-value green">{problemaResumo?.problemas_resolvidos || 0}</p>
              </div>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>Alta Prioridade</p>
              <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#dc2626', margin: 0 }}>
                {problemaResumo?.problemas_alta_prioridade || 0}
              </p>
            </div>
            <Link to="/problemas" className="card-link">
              Ver todos os problemas →
            </Link>
          </div>

          {/* Resumo de Estoque */}
          <div className="card-item">
            <div className="card-header">
              <div className="card-icon blue">
                <span className="card-icon-text">📦</span>
              </div>
              <div className="card-info">
                <h3>Estoque</h3>
                <p>{selectedImovel.nome}</p>
              </div>
            </div>
            <div className="card-stats">
              <div className="stat-item">
                <p>Total</p>
                <p className="stat-value gray">{estoqueResumo?.total_itens || 0}</p>
              </div>
              <div className="stat-item">
                <p>Precisam Repor</p>
                <p className="stat-value orange">{estoqueResumo?.itens_precisam_repor || 0}</p>
              </div>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>Categorias</p>
              <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#111827', margin: 0 }}>
                {estoqueResumo?.total_categorias || 0}
              </p>
            </div>
            <Link to="/estoque" className="card-link">
              Ver estoque completo →
            </Link>
          </div>
        </div>
      )}

      {/* Ações Rápidas */}
      <div className="card">
        <h2 className="card-title">Ações Rápidas</h2>
        <div className="action-grid">
          <Link to="/imoveis" className="action-card">
            <div className="action-icon"></div>
            <h3 className="action-title">Gerenciar Imóveis</h3>
            <p className="action-description">Adicionar ou editar imóveis</p>
          </Link>
          
          <Link to="/contas" className="action-card">
            <div className="action-icon"></div>
            <h3 className="action-title">Nova Conta</h3>
            <p className="action-description">Adicionar conta a pagar</p>
          </Link>
          
          <Link to="/problemas" className="action-card">
            <div className="action-icon"></div>
            <h3 className="action-title">Reportar Problema</h3>
            <p className="action-description">Registrar problema no imóvel</p>
          </Link>
          
          <Link to="/estoque" className="action-card">
            <div className="action-icon"></div>
            <h3 className="action-title">Adicionar Item</h3>
            <p className="action-description">Adicionar item ao estoque</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;