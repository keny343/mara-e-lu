import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  MagnifyingGlassIcon,
  EyeIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

const MatriculasList = () => {
  const [matriculas, setMatriculas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMatriculas = useCallback(async () => {
    try {
      const api = axios.create({
        baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      const params = {
        page: currentPage,
        limit: 10
      };

      if (searchTerm) {
        params.search = searchTerm;
      }

      const response = await api.get('/api/matriculas', { params });
      setMatriculas(response.data.matriculas || []);
      setTotalPages(response.data.pagination?.totalPages || 1);
    } catch (error) {
      console.error('Erro ao buscar matrículas:', error);
      // Dados mock para desenvolvimento
      setMatriculas([
        {
          id: 1,
          numero_matricula: '2024000001',
          aluno_nome: 'João Silva',
          aluno_email: 'joao@email.com',
          curso_nome: 'Informática Básica',
          status: 'ativa',
          data_matricula: '2024-01-15T10:30:00',
          valor_final: 199.90,
          forma_pagamento: 'multicaixa'
        },
        {
          id: 2,
          numero_matricula: '2024000002',
          aluno_nome: 'Maria Santos',
          aluno_email: 'maria@email.com',
          curso_nome: 'Inglês Intermediário',
          status: 'ativa',
          data_matricula: '2024-01-14T14:20:00',
          valor_final: 299.90,
          forma_pagamento: 'referencia'
        }
      ]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm]);

  useEffect(() => {
    fetchMatriculas();
  }, [fetchMatriculas]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getStatusColor = (status) => {
    const colors = {
      ativa: 'bg-green-100 text-green-800',
      trancada: 'bg-yellow-100 text-yellow-800',
      concluida: 'bg-blue-100 text-blue-800',
      cancelada: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Matrículas</h1>
            <p className="text-gray-600">Gerencie todas as matrículas confirmadas</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Buscar por nome do aluno, curso ou número da matrícula..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {matriculas.length === 0 ? (
            <li className="px-6 py-4 text-center text-gray-500">
              Nenhuma matrícula encontrada
            </li>
          ) : (
            matriculas.map((matricula) => (
              <li key={matricula.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                          <DocumentTextIcon className="h-5 w-5 text-green-600" />
                        </div>
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium text-gray-900">
                            {matricula.numero_matricula} - {matricula.aluno_nome}
                          </h3>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(matricula.status)}`}>
                            {matricula.status}
                          </span>
                        </div>
                        <div className="mt-1 flex flex-wrap gap-4 text-sm text-gray-500">
                          <span>{matricula.aluno_email}</span>
                          <span>Curso: {matricula.curso_nome}</span>
                          <span>{formatDate(matricula.data_matricula)}</span>
                        </div>
                        <div className="mt-2 flex gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Valor:</span>
                            <span className="ml-1 font-medium">{formatCurrency(matricula.valor_final)}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Pagamento:</span>
                            <span className="ml-1 font-medium capitalize">{matricula.forma_pagamento}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <Link
                      to={`/admin/matriculas/${matricula.id}`}
                      className="p-2 text-gray-400 hover:text-blue-600"
                      title="Visualizar"
                    >
                      <EyeIcon className="h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Página {currentPage} de {totalPages}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm border rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Anterior
            </button>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm border rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Próxima
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatriculasList;
