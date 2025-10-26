import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register: React.FC = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nome || !formData.email || !formData.senha || !formData.confirmarSenha) {
      setError('Todos os campos são obrigatórios');
      return;
    }

    if (formData.senha !== formData.confirmarSenha) {
      setError('As senhas não coincidem');
      return;
    }

    if (formData.senha.length < 6) {
      setError('Senha deve ter pelo menos 6 caracteres');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      await registerUser(formData.nome, formData.email, formData.senha);
      navigate('/dashboard');
    } catch (error: any) {
      setError(error.response?.data?.error || 'Erro ao criar conta');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <div className="form-header">
          <h2 className="form-title">
            Criar nova conta
          </h2>
          <p className="form-subtitle">
            Ou{' '}
            <Link to="/login" className="form-link">
              entrar na sua conta existente
            </Link>
          </p>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="nome" className="form-label">
              Nome completo
            </label>
            <input
              name="nome"
              type="text"
              value={formData.nome}
              onChange={handleChange}
              className="form-input"
              placeholder="Seu nome completo"
              required
              minLength={2}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              placeholder="seu@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="senha" className="form-label">
              Senha
            </label>
            <input
              name="senha"
              type="password"
              value={formData.senha}
              onChange={handleChange}
              className="form-input"
              placeholder="Sua senha"
              required
              minLength={6}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmarSenha" className="form-label">
              Confirmar senha
            </label>
            <input
              name="confirmarSenha"
              type="password"
              value={formData.confirmarSenha}
              onChange={handleChange}
              className="form-input"
              placeholder="Confirme sua senha"
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="form-button"
          >
            {isLoading ? 'Criando conta...' : 'Criar conta'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;