import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const isAuthenticated = () => {
    if (!token) return false;
    
    try {
      // Verificar se o token não expirou (opcional)
      const payload = JSON.parse(atob(token.split('.')[1]));
      const now = Date.now() / 1000;
      return payload.exp > now;
    } catch (error) {
      return false;
    }
  };

  const isAdmin = () => {
    return user.nivel === 'admin' || user.nivel === 'secretaria';
  };

  if (!isAuthenticated()) {
    // Redirecionar para login com a URL atual como state
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isAdmin()) {
    // Se não for admin, redirecionar para página inicial
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
