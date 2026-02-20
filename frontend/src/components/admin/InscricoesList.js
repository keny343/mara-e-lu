import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/api';
import {
  MagnifyingGlassIcon,
  PlusIcon,
  EyeIcon,
  CheckIcon,
  XMarkIcon,
  ClockIcon
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

  const fetchInscricoes = useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: 10
      };

      if (searchTerm) params.search = searchTerm;
      if (statusFilter) params.status = statusFilter;

      const response = await api.get('/api/inscricoes', { params });
      setInscricoes(response.data.inscricoes || []);
      setTotalPages(response.data.pagination?.totalPages || 1);
    } catch (error) {
      console.error('Erro ao buscar inscrições:', error);
      // Fallback a dados mock redundante se necessário...
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm, statusFilter]);

  useEffect(() => {
    fetchInscricoes();
  }, [fetchInscricoes]);

  const handleStatusUpdate = async () => {
    if (!inscricaoToUpdate || !newStatus) return;

    try {
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
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getStatusStyle = (status) => {
    const styles = {
      pendente: 'bg-orange-50 text-orange-600 border-orange-100',
      aprovada: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      rejeitada: 'bg-rose-50 text-rose-600 border-rose-100',
      cancelada: 'bg-gray-50 text-gray-600 border-gray-100'
    };
    return styles[status] || styles.pendente;
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#FF8C00]"></div>
        <p className="text-gray-500 font-medium">Carregando inscrições...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#2C1810]">Inscrições</h1>
          <p className="text-gray-500 mt-1">Gerencie e analise os pedidos de matrícula.</p>
        </div>
        <Link
          to="/admin/inscricoes/new"
          className="inline-flex items-center px-6 py-3 rounded-2xl bg-gradient-to-r from-[#FF8C00] to-[#FF6B35] text-white font-bold shadow-lg hover:shadow-orange-500/30 transition-all transform hover:-translate-y-0.5"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Nova Inscrição
        </Link>
      </div>

      {/* Filters Area */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 relative">
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por aluno ou curso..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-[#FF8C00] transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-[#FF8C00] transition-all"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Todos os Status</option>
          <option value="pendente">Pendente</option>
          <option value="aprovada">Aprovada</option>
          <option value="rejeitada">Rejeitada</option>
        </select>
      </div>

      {/* Content */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Aluno</th>
                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Curso</th>
                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Data</th>
                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {inscricoes.map((inscricao) => (
                <tr key={inscricao.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-xl bg-orange-100 flex items-center justify-center text-[#FF8C00] font-bold mr-3">
                        {inscricao.nome_aluno.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#2C1810]">{inscricao.nome_aluno}</p>
                        <p className="text-xs text-gray-500">{inscricao.email_aluno}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-sm font-medium text-gray-700">{inscricao.nome_curso}</span>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-sm text-gray-500">{formatDate(inscricao.data_inscricao)}</span>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border ${getStatusStyle(inscricao.status)}`}>
                      {inscricao.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right space-x-2">
                    <button className="p-2 text-gray-400 hover:text-[#FF8C00] transition-colors"><EyeIcon className="h-5 w-5" /></button>
                    {inscricao.status === 'pendente' && (
                      <>
                        <button
                          onClick={() => { setInscricaoToUpdate(inscricao); setNewStatus('aprovada'); setShowStatusModal(true); }}
                          className="p-2 text-gray-400 hover:text-emerald-500 transition-colors"
                        >
                          <CheckIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => { setInscricaoToUpdate(inscricao); setNewStatus('rejeitada'); setShowStatusModal(true); }}
                          className="p-2 text-gray-400 hover:text-rose-500 transition-colors"
                        >
                          <XMarkIcon className="h-5 w-5" />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between px-8 pb-8">
          <div className="text-sm text-gray-500">
            Página <span className="font-bold text-[#2C1810]">{currentPage}</span> de <span className="font-bold text-[#2C1810]">{totalPages}</span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm font-semibold border border-gray-200 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              Anterior
            </button>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-sm font-semibold bg-[#2C1810] text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#4A2C1A] transition-colors shadow-md"
            >
              Próxima
            </button>
          </div>
        </div>
      )}

      {/* Status Update Modal */}
      {showStatusModal && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" onClick={() => setShowStatusModal(false)}></div>

            <div className="inline-block align-bottom bg-white rounded-3xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full border border-gray-100">
              <div className="bg-white px-8 pt-8 pb-6">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-2xl bg-orange-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ClockIcon className="h-6 w-6 text-[#FF8C00]" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-xl font-bold text-[#2C1810]">
                      Atualizar Status
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 leading-relaxed">
                        Deseja alterar o status da inscrição de <strong className="text-[#2C1810]">{inscricaoToUpdate?.nome_aluno}</strong> para <strong className="text-[#FF8C00] font-bold uppercase">{newStatus}</strong>?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50/50 px-8 py-6 sm:flex sm:flex-row-reverse gap-3">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-2xl border border-transparent shadow-lg px-6 py-3 bg-[#FF8C00] text-base font-bold text-white hover:bg-[#FF6B35] transition-all sm:w-auto sm:text-sm"
                  onClick={handleStatusUpdate}
                >
                  Confirmar Alteração
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-2xl border border-gray-200 px-6 py-3 bg-white text-base font-bold text-gray-700 hover:bg-gray-50 transition-all sm:mt-0 sm:w-auto sm:text-sm"
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
