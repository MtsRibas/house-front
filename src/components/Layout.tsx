import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: '' },
    { name: 'Imóveis', href: '/imoveis', icon: '' },
    { name: 'Contas', href: '/contas', icon: '' },
    { name: 'Problemas', href: '/problemas', icon: '' },
    { name: 'Estoque', href: '/estoque', icon: '' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="layout">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h1 className="sidebar-title">OH</h1>
        </div>
        
        <nav className="sidebar-nav">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`nav-item ${isActive(item.href) ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>

        {/* User info */}
        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">
              <span className="user-avatar-text">
                {user?.nome?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="user-name">{user?.nome}</p>
              <p className="user-email">{user?.email}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="logout-button">
            Sair
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="main-content">
        <div className="content-wrapper">
          <div className="content-container">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;