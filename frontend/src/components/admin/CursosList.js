import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  MagnifyingGlassIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';

const CursosList = () => {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [cursoToDelete, setCursoToDelete] = useState(null);

  useEffect(() => {
    fetchCursos();
  }, [currentPage, searchTerm, fetchCursos]);

  const fetchCursos = useCallback(async () => {
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

      const response = await api.get('/api/cursos', { params });
      setCursos(response.data.cursos || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error('Erro ao buscar cursos:', error);
      // Dados mock para desenvolvimento
      setCursos([
        {
          id: 1,
          nome: 'Informática Básica',
          descricao: 'Curso básico de informática para iniciantes',
          duracao_meses: 3,
          valor: 199.90,
          vagas_totais: 30,
          vagas_disponiveis: 25,
          data_inicio: '2024-03-01',
          data_fim: '2024-05-31',
          status: 'ativo',
          created_at: '2024-01-10'
        },
        {
          id: 2,
          nome: 'Inglês Intermediário',
          descricao: 'Curso de inglês nível intermediário',
          duracao_meses: 6,
          valor: 299.90,
          vagas_totais: 20,
          vagas_disponiveis: 15,
          data_inicio: '2024-03-15',
          data_fim: '2024-09-14',
          status: 'ativo',
          created_at: '2024-01-12'
        }
      ]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm]);

  const handleDelete = async () => {
    if (!cursoToDelete) return;

    try {
      const api = axios.create({
        baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      await api.delete(`/api/cursos/${cursoToDelete.id}`);
      setCursos(cursos.filter(curso => curso.id !== cursoToDelete.id));
      setShowDeleteModal(false);
      setCursoToDelete(null);
    } catch (error) {
      console.error('Erro ao excluir curso:', error);
      alert('Erro ao excluir curso. Tente novamente.');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getStatusColor = (status) => {
    const colors = {
      ativo: 'bg-green-100 text-green-800',
      inativo: 'bg-yellow-100 text-yellow-800',
      encerrado: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getVagasColor = (vagas_disponiveis, vagas_totais) => {
    const percentage = (vagas_disponiveis / vagas_totais) * 100;
    if (percentage > 50) return 'text-green-600';
    if (percentage > 20) return 'text-yellow-600';
    return 'text-red-600';
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
            <h1 className="text-2xl font-bold text-gray-900">Cursos</h1>
            <p className="text-gray-600">Gerencie todos os cursos oferecidos</p>
          </div>
          <Link
            to="/admin/cursos/new"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Novo Curso
          </Link>
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
            placeholder="Buscar por nome do curso..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {cursos.length === 0 ? (
            <li className="px-6 py-4 text-center text-gray-500">
              Nenhum curso encontrado
            </li>
          ) : (
            cursos.map((curso) => (
              <li key={curso.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <AcademicCapIcon className="h-5 w-5 text-blue-600" />
                        </div>
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium text-gray-900">
                            {curso.nome}
                          </h3>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(curso.status)}`}>
                            {curso.status}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {curso.descricao}
                        </p>
                        <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Duração:</span>
                            <span className="ml-1 font-medium">{curso.duracao_meses} meses</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Valor:</span>
                            <span className="ml-1 font-medium">{formatCurrency(curso.valor)}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Vagas:</span>
                            <span className={`ml-1 font-medium ${getVagasColor(curso.vagas_disponiveis, curso.vagas_totais)}`}>
                              {curso.vagas_disponiveis}/{curso.vagas_totais}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500">Período:</span>
                            <span className="ml-1 font-medium">
                              {formatDate(curso.data_inicio)} - {formatDate(curso.data_fim)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <Link
                      to={`/admin/cursos/${curso.id}`}
                      className="p-2 text-gray-400 hover:text-blue-600"
                      title="Visualizar"
                    >
                      <EyeIcon className="h-5 w-5" />
                    </Link>
                    <Link
                      to={`/admin/cursos/${curso.id}/edit`}
                      className="p-2 text-gray-400 hover:text-green-600"
                      title="Editar"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </Link>
                    <button
                      onClick={() => {
                        setCursoToDelete(curso);
                        setShowDeleteModal(true);
                      }}
                      className="p-2 text-gray-400 hover:text-red-600"
                      title="Excluir"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
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

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <TrashIcon className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Excluir Curso
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Tem certeza que deseja excluir o curso "{cursoToDelete?.nome}"? 
                        Esta ação não pode ser desfeita.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleDelete}
                >
                  Excluir
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    setShowDeleteModal(false);
                    setCursoToDelete(null);
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

export default CursosList;
