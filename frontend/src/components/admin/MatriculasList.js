import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/api';
import {
  MagnifyingGlassIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

const MatriculasList = () => {
  const [matriculas, setMatriculas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMatriculas = useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: 10
      };

      if (searchTerm) params.search = searchTerm;

      const response = await api.get('/api/matriculas', { params });
      setMatriculas(response.data.matriculas || []);
      setTotalPages(response.data.pagination?.totalPages || 1);
    } catch (error) {
      console.error('Erro ao buscar matrículas:', error);
      // Fallback a dados mock
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
      year: 'numeric'
    });
  };


  const getStatusStyle = (status) => {
    const styles = {
      ativa: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      trancada: 'bg-orange-50 text-orange-600 border-orange-100',
      concluida: 'bg-blue-50 text-blue-600 border-blue-100',
      cancelada: 'bg-rose-50 text-rose-600 border-rose-100'
    };
    return styles[status] || 'bg-gray-50 text-gray-600 border-gray-100';
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#FF8C00]"></div>
        <p className="text-gray-500 font-medium">Carregando matrículas...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#2C1810]">Matrículas</h1>
          <p className="text-gray-500 mt-1">Controle de alunos oficialmente matriculados.</p>
        </div>
      </div>

      {/* Search Area */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nome, curso ou número de matrícula..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-[#FF8C00] transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Matrícula / Aluno</th>
                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Curso</th>
                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Data / Pagamento</th>
                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {matriculas.map((matricula) => (
                <tr key={matricula.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-5">
                    <div>
                      <p className="text-sm font-bold text-[#2C1810]">{matricula.numero_matricula}</p>
                      <p className="text-xs text-gray-500">{matricula.aluno_nome}</p>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-sm font-medium text-gray-700">{matricula.curso_nome}</span>
                  </td>
                  <td className="px-8 py-5">
                    <p className="text-sm text-gray-700">{formatDate(matricula.data_matricula)}</p>
                    <p className="text-[10px] font-bold text-[#FF8C00] uppercase">{matricula.forma_pagamento}</p>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border ${getStatusStyle(matricula.status)}`}>
                      {matricula.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <Link to={`/admin/matriculas/${matricula.id}`} className="p-2 text-gray-400 hover:text-[#FF8C00] transition-colors inline-block">
                      <EyeIcon className="h-5 w-5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-8 py-6 border-t border-gray-50 flex items-center justify-between">
            <span className="text-sm text-gray-500">Pág. {currentPage} de {totalPages}</span>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 text-xs font-bold border border-gray-200 rounded-xl disabled:opacity-40"
              >
                Anterior
              </button>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-xs font-bold bg-[#2C1810] text-white rounded-xl disabled:opacity-40"
              >
                Próximo
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default MatriculasList;
