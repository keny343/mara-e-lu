import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  MagnifyingGlassIcon,
  PlusIcon,
  EyeIcon,
  CheckIcon,
  XMarkIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

const InscricoesList = () => {
  const [inscricoes, setInscricoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [inscricaoToUpdate, setInscricaoToUpdate] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    fetchInscricoes();
  }, [currentPage, searchTerm, statusFilter]);

  const fetchInscricoes = async () => {
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

      if (statusFilter) {
        params.status = statusFilter;
      }

      const response = await api.get('/api/inscricoes', { params });
      setInscricoes(response.data.inscricoes || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error('Erro ao buscar inscrições:', error);
      // Dados mock para desenvolvimento
      setInscricoes([
        {
          id: 1,
          nome_aluno: 'João Silva',
          email_aluno: 'joao@email.com',
          nome_curso: 'Informática Básica',
          status: 'pendente',
          data_inscricao: '2024-01-15T10:30:00',
          observacoes: 'Interessado em turma noturna'
        },
        {
          id: 2,
          nome_aluno: 'Maria Santos',
          email_aluno: 'maria@email.com',
          nome_curso: 'Inglês Intermediário',
          status: 'aprovada',
          data_inscricao: '2024-01-14T14:20:00',
          observacoes: 'Experiência prévia com inglês básico'
        },
        {
          id: 3,
          nome_aluno: 'Pedro Costa',
          email_aluno: 'pedro@email.com',
          nome_curso: 'Excel Avançado',
          status: 'rejeitada',
          data_inscricao: '2024-01-14T09:15:00',
          observacoes: 'Não cumpre pré-requisitos'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async () => {
    if (!inscricaoToUpdate || !newStatus) return;

    try {
      const api = axios.create({
        baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      await api.put(`/api/inscricoes/${inscricaoToUpdate.id}/status`, { 
        status: newStatus 
      });
      
      setInscricoes(inscricoes.map(inscricao => 
        inscricao.id === inscricaoToUpdate.id 
          ? { ...inscricao, status: newStatus }
          : inscricao
      ));
      
      setShowStatusModal(false);
      setInscricaoToUpdate(null);
      setNewStatus('');
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      alert('Erro ao atualizar status. Tente novamente.');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      pendente: 'bg-yellow-100 text-yellow-800',
      aprovada: 'bg-green-100 text-green-800',
      rejeitada: 'bg-red-100 text-red-800',
      cancelada: 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'aprovada':
        return <CheckIcon className="h-4 w-4" />;
      case 'rejeitada':
        return <XMarkIcon className="h-4 w-4" />;
      default:
        return <DocumentTextIcon className="h-4 w-4" />;
    }
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
            <h1 className="text-2xl font-bold text-gray-900">Inscrições</h1>
            <p className="text-gray-600">Gerencie todas as inscrições dos alunos</p>
          </div>
          <Link
            to="/admin/inscricoes/new"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Nova Inscrição
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Buscar por nome do aluno ou curso..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Todos os status</option>
          <option value="pendente">Pendente</option>
          <option value="aprovada">Aprovada</option>
          <option value="rejeitada">Rejeitada</option>
          <option value="cancelada">Cancelada</option>
        </select>
      </div>

      {/* Stats Cards */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-full">
              <DocumentTextIcon className="h-5 w-5 text-yellow-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-500">Pendentes</p>
              <p className="text-lg font-semibold text-gray-900">
                {inscricoes.filter(i => i.status === 'pendente').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-full">
              <CheckIcon className="h-5 w-5 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-500">Aprovadas</p>
              <p className="text-lg font-semibold text-gray-900">
                {inscricoes.filter(i => i.status === 'aprovada').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-full">
              <XMarkIcon className="h-5 w-5 text-red-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-500">Rejeitadas</p>
              <p className="text-lg font-semibold text-gray-900">
                {inscricoes.filter(i => i.status === 'rejeitada').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-gray-100 rounded-full">
              <DocumentTextIcon className="h-5 w-5 text-gray-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-500">Total</p>
              <p className="text-lg font-semibold text-gray-900">
                {inscricoes.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {inscricoes.length === 0 ? (
            <li className="px-6 py-4 text-center text-gray-500">
              Nenhuma inscrição encontrada
            </li>
          ) : (
            inscricoes.map((inscricao) => (
              <li key={inscricao.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${getStatusColor(inscricao.status).split(' ')[0]}`}>
                          <div className={getStatusColor(inscricao.status).split(' ')[1]}>
                            {getStatusIcon(inscricao.status)}
                          </div>
                        </div>
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium text-gray-900">
                            {inscricao.nome_aluno}
                          </h3>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(inscricao.status)}`}>
                            {inscricao.status}
                          </span>
                        </div>
                        <div className="mt-1 flex flex-wrap gap-4 text-sm text-gray-500">
                          <span>{inscricao.email_aluno}</span>
                          <span>Curso: {inscricao.nome_curso}</span>
                          <span>{formatDate(inscricao.data_inscricao)}</span>
                        </div>
                        {inscricao.observacoes && (
                          <p className="mt-2 text-sm text-gray-600">
                            <strong>Obs:</strong> {inscricao.observacoes}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <Link
                      to={`/admin/inscricoes/${inscricao.id}`}
                      className="p-2 text-gray-400 hover:text-blue-600"
                      title="Visualizar"
                    >
                      <EyeIcon className="h-5 w-5" />
                    </Link>
                    {inscricao.status === 'pendente' && (
                      <>
                        <button
                          onClick={() => {
                            setInscricaoToUpdate(inscricao);
                            setNewStatus('aprovada');
                            setShowStatusModal(true);
                          }}
                          className="p-2 text-gray-400 hover:text-green-600"
                          title="Aprovar"
                        >
                          <CheckIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => {
                            setInscricaoToUpdate(inscricao);
                            setNewStatus('rejeitada');
                            setShowStatusModal(true);
                          }}
                          className="p-2 text-gray-400 hover:text-red-600"
                          title="Rejeitar"
                        >
                          <XMarkIcon className="h-5 w-5" />
                        </button>
                      </>
                    )}
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

      {/* Status Update Modal */}
      {showStatusModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                    {getStatusIcon(newStatus)}
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Atualizar Status
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Tem certeza que deseja alterar o status da inscrição de "{inscricaoToUpdate?.nome_aluno}" para "{newStatus}"?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleStatusUpdate}
                >
                  Confirmar
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    setShowStatusModal(false);
                    setInscricaoToUpdate(null);
                    setNewStatus('');
                  }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InscricoesList;
