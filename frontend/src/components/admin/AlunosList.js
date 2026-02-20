import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/api';
import {
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  UserPlusIcon
} from '@heroicons/react/24/outline';

const AlunosList = () => {
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [alunoToDelete, setAlunoToDelete] = useState(null);

  const fetchAlunos = useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: 10
      };

      if (searchTerm) params.search = searchTerm;

      const response = await api.get('/api/alunos', { params });
      setAlunos(response.data.alunos || []);
      setTotalPages(response.data.pagination?.totalPages || 1);
    } catch (error) {
      console.error('Erro ao buscar alunos:', error);
      // Fallback a dados mock
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm]);

  useEffect(() => {
    fetchAlunos();
  }, [fetchAlunos]);

  const handleDelete = async () => {
    if (!alunoToDelete) return;

    try {
      await api.delete(`/api/alunos/${alunoToDelete.id}`);
      setAlunos(alunos.filter(aluno => aluno.id !== alunoToDelete.id));
      setShowDeleteModal(false);
      setAlunoToDelete(null);
    } catch (error) {
      console.error('Erro ao excluir aluno:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#FF8C00]"></div>
        <p className="text-gray-500 font-medium">Carregando alunos...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#2C1810]">Alunos</h1>
          <p className="text-gray-500 mt-1">Gerencie a base de dados de estudantes.</p>
        </div>
        <Link
          to="/admin/alunos/new"
          className="inline-flex items-center px-6 py-3 rounded-2xl bg-gradient-to-r from-[#FF8C00] to-[#FF6B35] text-white font-bold shadow-lg hover:shadow-orange-500/30 transition-all transform hover:-translate-y-0.5"
        >
          <UserPlusIcon className="h-5 w-5 mr-2" />
          Novo Aluno
        </Link>
      </div>

      {/* Search Area */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nome, email ou BI..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-[#FF8C00] transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Estudante</th>
                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Documento / Telefone</th>
                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Data Nasc.</th>
                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {alunos.map((aluno) => (
                <tr key={aluno.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-xl bg-orange-100 flex items-center justify-center text-[#FF8C00] font-bold mr-3">
                        {aluno.nome_completo.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#2C1810]">{aluno.nome_completo}</p>
                        <p className="text-xs text-gray-500">{aluno.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <p className="text-sm font-medium text-gray-700">{aluno.numero_bilhete}</p>
                    <p className="text-xs text-gray-400">{aluno.telefone}</p>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-sm text-gray-500">{formatDate(aluno.data_nascimento)}</span>
                  </td>
                  <td className="px-8 py-5 text-right space-x-1">
                    <Link to={`/admin/alunos/${aluno.id}`} className="p-2 text-gray-400 hover:text-[#FF8C00] transition-colors inline-block">
                      <EyeIcon className="h-5 w-5" />
                    </Link>
                    <Link to={`/admin/alunos/${aluno.id}/edit`} className="p-2 text-gray-400 hover:text-emerald-500 transition-colors inline-block">
                      <PencilIcon className="h-5 w-5" />
                    </Link>
                    <button
                      onClick={() => { setAlunoToDelete(aluno); setShowDeleteModal(true); }}
                      className="p-2 text-gray-400 hover:text-rose-500 transition-colors inline-block"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination inside the container */}
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

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" onClick={() => setShowDeleteModal(false)}></div>
            <div className="inline-block align-bottom bg-white rounded-3xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full border border-gray-100">
              <div className="p-8">
                <div className="flex items-center justify-center h-12 w-12 rounded-2xl bg-rose-100 text-rose-600 mb-6">
                  <TrashIcon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-[#2C1810] mb-2">Excluir Aluno</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-8">
                  Tem certeza que deseja remover <strong className="text-[#2C1810]">{alunoToDelete?.nome_completo}</strong>? Esta ação é irreversível e removerá todos os dados vinculados.
                </p>
                <div className="flex flex-col sm:flex-row-reverse gap-3">
                  <button
                    onClick={handleDelete}
                    className="px-6 py-3 bg-rose-600 text-white font-bold rounded-2xl shadow-lg shadow-rose-500/30 hover:bg-rose-700 transition-all flex-1"
                  >
                    Sim, Excluir
                  </button>
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="px-6 py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-2xl hover:bg-gray-50 transition-all flex-1"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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

export default AlunosList;
