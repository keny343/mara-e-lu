import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/api';
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

  const fetchCursos = useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: 10
      };

      if (searchTerm) params.search = searchTerm;

      const response = await api.get('/api/cursos', { params });
      setCursos(response.data.cursos || []);
      setTotalPages(response.data.pagination?.totalPages || 1);
    } catch (error) {
      console.error('Erro ao buscar cursos:', error);
      // Fallback a dados mock
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm]);

  useEffect(() => {
    fetchCursos();
  }, [fetchCursos]);

  const handleDelete = async () => {
    if (!cursoToDelete) return;

    try {
      await api.delete(`/api/cursos/${cursoToDelete.id}`);
      setCursos(cursos.filter(curso => curso.id !== cursoToDelete.id));
      setShowDeleteModal(false);
      setCursoToDelete(null);
    } catch (error) {
      console.error('Erro ao excluir curso:', error);
    }
  };


  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'AOA' // Changed to Kwanza as it seems to be an Angolan system (+244)
    }).format(value);
  };

  const getStatusStyle = (status) => {
    const styles = {
      ativo: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      inativo: 'bg-orange-50 text-orange-600 border-orange-100',
      encerrado: 'bg-rose-50 text-rose-600 border-rose-100'
    };
    return styles[status] || 'bg-gray-50 text-gray-600 border-gray-100';
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#FF8C00]"></div>
        <p className="text-gray-500 font-medium">Carregando cursos...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#2C1810]">Cursos</h1>
          <p className="text-gray-500 mt-1">Gerencie a oferta acadêmica do colégio.</p>
        </div>
        <Link
          to="/admin/cursos/new"
          className="inline-flex items-center px-6 py-3 rounded-2xl bg-gradient-to-r from-[#FF8C00] to-[#FF6B35] text-white font-bold shadow-lg hover:shadow-orange-500/30 transition-all transform hover:-translate-y-0.5"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Novo Curso
        </Link>
      </div>

      {/* Search Area */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nome do curso..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-[#FF8C00] transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Courses Grid instead of a simple table for a more premium look */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cursos.map((curso) => (
          <div key={curso.id} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
            <div className="flex items-start justify-between mb-6">
              <div className="h-14 w-14 rounded-2xl bg-orange-100 flex items-center justify-center text-[#FF8C00] shadow-sm group-hover:scale-110 transition-transform">
                <AcademicCapIcon className="h-8 w-8" />
              </div>
              <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border ${getStatusStyle(curso.status)}`}>
                {curso.status}
              </span>
            </div>

            <h3 className="text-xl font-bold text-[#2C1810] mb-2">{curso.nome}</h3>
            <p className="text-sm text-gray-500 line-clamp-2 mb-6 leading-relaxed">
              {curso.descricao}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">Duração</p>
                <p className="text-sm font-bold text-[#2C1810]">{curso.duracao_meses} Meses</p>
              </div>
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">Investimento</p>
                <p className="text-sm font-bold text-[#2C1810]">{formatCurrency(curso.valor)}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-gray-50">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#FF8C00]"></div>
                <span className="text-xs font-bold text-gray-600">{curso.vagas_disponiveis} vagas restantes</span>
              </div>
              <div className="flex items-center gap-1">
                <Link to={`/admin/cursos/${curso.id}`} className="p-2 text-gray-400 hover:text-[#FF8C00] transition-colors"><EyeIcon className="h-5 w-5" /></Link>
                <Link to={`/admin/cursos/${curso.id}/edit`} className="p-2 text-gray-400 hover:text-emerald-500 transition-colors"><PencilIcon className="h-5 w-5" /></Link>
                <button
                  onClick={() => { setCursoToDelete(curso); setShowDeleteModal(true); }}
                  className="p-2 text-gray-400 hover:text-rose-500 transition-colors"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Container */}
      {totalPages > 1 && (
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
          <span className="text-sm text-gray-500 font-medium">Página {currentPage} de {totalPages}</span>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-6 py-2 text-xs font-bold border border-gray-200 rounded-xl disabled:opacity-40 hover:bg-gray-50 transition-all"
            >
              Anterior
            </button>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-6 py-2 text-xs font-bold bg-[#2C1810] text-white rounded-xl disabled:opacity-40 hover:bg-[#4A2C1A] transition-all"
            >
              Próximo
            </button>
          </div>
        </div>
      )}

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
                <h3 className="text-xl font-bold text-[#2C1810] mb-2">Excluir Curso</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-8">
                  Tem certeza que deseja remover o curso <strong className="text-[#2C1810]">{cursoToDelete?.nome}</strong>? Esta ação removerá a oferta e pode afetar inscrições ativas.
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

export default CursosList;
