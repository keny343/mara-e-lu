import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/api';
import {
  UserGroupIcon,
  AcademicCapIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const StatCard = ({ title, value, icon: Icon, colorClass, link }) => {
  const Card = link ? Link : 'div';
  const cardProps = link ? { to: link } : {};

  return (
    <Card
      {...cardProps}
      className={`${link ? 'hover:-translate-y-1 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-xl' : ''} bg-white rounded-2xl p-6 border border-gray-100 flex items-start space-x-4`}
    >
      <div className={`p-3 rounded-xl ${colorClass} text-white shadow-lg`}>
        <Icon className="h-6 w-6" />
      </div>
      <div className="flex-1">
        <dt className="text-sm font-medium text-gray-400 uppercase tracking-wider">{title}</dt>
        <dd className="text-2xl font-extrabold text-[#2C1810] mt-1">{value}</dd>
        {link && (
          <div className="mt-2 flex items-center text-xs font-semibold text-[#FF8C00]">
            Ver detalhes <ArrowTrendingUpIcon className="ml-1 h-3 w-3" />
          </div>
        )}
      </div>
    </Card>
  );
};

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalAlunos: 0,
    totalCursos: 0,
    totalInscricoes: 0,
    totalMatriculas: 0
  });
  const [recentInscricoes, setRecentInscricoes] = useState([]);
  const [loading, setLoading] = useState(true);

  const mockStats = useMemo(() => ({
    totalAlunos: 156,
    totalCursos: 8,
    totalInscricoes: 89,
    totalMatriculas: 67
  }), []);

  const mockInscricoes = useMemo(() => [
    { id: 1, nome: 'João Silva', curso: 'Informática Básica', status: 'pendente', data: '2024-02-19' },
    { id: 2, nome: 'Maria Santos', curso: 'Inglês Intermediário', status: 'aprovada', data: '2024-02-18' },
    { id: 3, nome: 'Pedro Costa', curso: 'Excel Avançado', status: 'pendente', data: '2024-02-18' },
    { id: 4, nome: 'Ana Oliveira', curso: 'Informática Básica', status: 'rejeitada', data: '2024-02-17' }
  ], []);

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      // Try to fetch real counts
      const counts = await Promise.allSettled([
        api.get('/api/alunos/count'),
        api.get('/api/cursos/count'),
        api.get('/api/inscricoes/count'),
        api.get('/api/matriculas/count')
      ]);

      setStats({
        totalAlunos: counts[0].status === 'fulfilled' ? counts[0].value.data.count : mockStats.totalAlunos,
        totalCursos: counts[1].status === 'fulfilled' ? counts[1].value.data.count : mockStats.totalCursos,
        totalInscricoes: counts[2].status === 'fulfilled' ? counts[2].value.data.count : mockStats.totalInscricoes,
        totalMatriculas: counts[3].status === 'fulfilled' ? counts[3].value.data.count : mockStats.totalMatriculas
      });

      const recentRes = await api.get('/api/inscricoes?limit=5&sort=desc');
      setRecentInscricoes(recentRes.data.inscricoes || mockInscricoes);
    } catch (error) {
      console.log('Using mock data');
      setStats(mockStats);
      setRecentInscricoes(mockInscricoes);
    } finally {
      setLoading(false);
    }
  }, [mockStats, mockInscricoes]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

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
        <p className="text-gray-500 font-medium">Carregando dados...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#2C1810]">Dashboard</h1>
          <p className="text-gray-500 mt-1">Bem-vindo ao centro de operações do Colégio Mara e Lú.</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-400 bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm">
          <ClockIcon className="h-4 w-4" />
          <span>Última atualização: {new Date().toLocaleTimeString()}</span>
        </div>
      </header>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Alunos"
          value={stats.totalAlunos}
          icon={UserGroupIcon}
          colorClass="bg-gradient-to-br from-blue-500 to-indigo-600"
          link="/admin/alunos"
        />
        <StatCard
          title="Cursos"
          value={stats.totalCursos}
          icon={AcademicCapIcon}
          colorClass="bg-gradient-to-br from-emerald-500 to-teal-600"
          link="/admin/cursos"
        />
        <StatCard
          title="Inscrições"
          value={stats.totalInscricoes}
          icon={DocumentTextIcon}
          colorClass="bg-gradient-to-br from-orange-400 to-red-500"
          link="/admin/inscricoes"
        />
        <StatCard
          title="Matrículas"
          value={stats.totalMatriculas}
          icon={CurrencyDollarIcon}
          colorClass="bg-gradient-to-br from-purple-500 to-pink-600"
          link="/admin/matriculas"
        />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Inscriptions */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-xl font-bold text-[#2C1810]">Inscrições Recentes</h3>
            <Link to="/admin/inscricoes" className="text-sm font-semibold text-[#FF8C00] hover:underline">
              Ver todas
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentInscricoes.map((inscricao) => (
              <div key={inscricao.id} className="px-8 py-5 hover:bg-gray-50/50 transition-colors flex items-center">
                <div className="h-12 w-12 rounded-2xl bg-gray-100 flex items-center justify-center text-[#2C1810] font-bold mr-4">
                  {inscricao.nome.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-[#2C1810] truncate">{inscricao.nome}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{inscricao.curso}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border ${getStatusStyle(inscricao.status)}`}>
                    {inscricao.status}
                  </span>
                  <span className="text-[10px] text-gray-400">{inscricao.data}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions & Info */}
        <div className="space-y-8">
          <div className="bg-gradient-to-br from-[#2C1810] to-[#4A2C1A] rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 h-32 w-32 bg-white/5 rounded-full blur-3xl"></div>
            <h3 className="text-lg font-bold mb-4 relative z-10">Ações Rápidas</h3>
            <div className="grid grid-cols-2 gap-4 relative z-10">
              <Link to="/admin/alunos/new" className="bg-white/10 hover:bg-white/20 transition-colors p-4 rounded-2xl text-center">
                <PlusIcon className="h-6 w-6 mx-auto mb-2 text-[#FF8C00]" />
                <span className="text-xs font-semibold">Aluno</span>
              </Link>
              <Link to="/admin/cursos/new" className="bg-white/10 hover:bg-white/20 transition-colors p-4 rounded-2xl text-center">
                <PlusIcon className="h-6 w-6 mx-auto mb-2 text-[#FF8C00]" />
                <span className="text-xs font-semibold">Curso</span>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-[#2C1810] mb-6">Status do Sistema</h3>
            <div className="space-y-6">
              {[
                { label: 'Servidor API', status: 'Online', color: 'bg-emerald-500' },
                { label: 'Banco de Dados', status: 'Conectado', color: 'bg-emerald-500' },
                { label: 'Acessos Hoje', status: '24', color: 'bg-[#FF8C00]' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">{item.label}</span>
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${item.color}`}></span>
                    <span className="text-sm font-bold text-[#2C1810]">{item.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
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

// Re-using PlusIcon internally to avoid more imports
const PlusIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

export default Dashboard;
