import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  UserGroupIcon,
  AcademicCapIcon,
  DocumentTextIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';

const StatCard = ({ title, value, icon: Icon, color = 'blue', link }) => {
  const bgClasses = {
    blue: 'bg-blue-50',
    green: 'bg-green-50',
    yellow: 'bg-yellow-50',
    red: 'bg-red-50',
    purple: 'bg-purple-50'
  };

  const textClasses = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    yellow: 'text-yellow-600',
    red: 'text-red-600',
    purple: 'text-purple-600'
  };

  const Card = link ? Link : 'div';
  const cardProps = link ? { to: link } : {};

  return (
    <Card
      {...cardProps}
      className={`${link ? 'hover:shadow-lg cursor-pointer' : ''} bg-white overflow-hidden rounded-lg shadow`}
    >
      <div className="p-5">
        <div className="flex items-center">
          <div className={`flex-shrink-0 ${bgClasses[color]} rounded-md p-3`}>
            <Icon className={`h-6 w-6 ${textClasses[color]}`} />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
              <dd className="text-lg font-semibold text-gray-900">{value}</dd>
            </dl>
          </div>
        </div>
      </div>
    </Card>
  );
};

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalAlunos: 0,
    totalCursos: 0,
    totalInscricoes: 0,
    totalMatriculas: 0,
    totalPagamentos: 0
  });
  const [recentInscricoes, setRecentInscricoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const api = axios.create({
        baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      // Buscar estatísticas
      const [alunosRes, cursosRes, inscricoesRes, matriculasRes] = await Promise.all([
        api.get('/api/alunos/count'),
        api.get('/api/cursos/count'),
        api.get('/api/inscricoes/count'),
        api.get('/api/matriculas/count')
      ]);

      setStats({
        totalAlunos: alunosRes.data.count || 0,
        totalCursos: cursosRes.data.count || 0,
        totalInscricoes: inscricoesRes.data.count || 0,
        totalMatriculas: matriculasRes.data.count || 0,
        totalPagamentos: 0 // TODO: Implementar endpoint de pagamentos
      });

      // Buscar inscrições recentes
      const recentRes = await api.get('/api/inscricoes?limit=5&sort=desc');
      setRecentInscricoes(Array.isArray(recentRes.data) ? recentRes.data : []);

    } catch (error) {
      console.error('Erro ao buscar dados do dashboard:', error);
      // Dados mock para desenvolvimento
      setStats({
        totalAlunos: 156,
        totalCursos: 8,
        totalInscricoes: 89,
        totalMatriculas: 67,
        totalPagamentos: 45
      });

      setRecentInscricoes([
        { id: 1, nome: 'João Silva', curso: 'Informática Básica', status: 'pendente', data: '2024-01-15' },
        { id: 2, nome: 'Maria Santos', curso: 'Inglês Intermediário', status: 'aprovada', data: '2024-01-14' },
        { id: 3, nome: 'Pedro Costa', curso: 'Excel Avançado', status: 'pendente', data: '2024-01-14' },
        { id: 4, nome: 'Ana Oliveira', curso: 'Informática Básica', status: 'rejeitada', data: '2024-01-13' },
        { id: 5, nome: 'Carlos Silva', curso: 'Inglês Intermediário', status: 'aprovada', data: '2024-01-13' }
      ]);
    } finally {
      setLoading(false);
    }
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Visão geral do sistema de inscrições e matrículas</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard
          title="Total de Alunos"
          value={stats.totalAlunos}
          icon={UserGroupIcon}
          color="blue"
          link="/admin/alunos"
        />
        <StatCard
          title="Cursos Ativos"
          value={stats.totalCursos}
          icon={AcademicCapIcon}
          color="green"
          link="/admin/cursos"
        />
        <StatCard
          title="Inscrições"
          value={stats.totalInscricoes}
          icon={DocumentTextIcon}
          color="yellow"
          link="/admin/inscricoes"
        />
        <StatCard
          title="Matrículas Ativas"
          value={stats.totalMatriculas}
          icon={CurrencyDollarIcon}
          color="purple"
          link="/admin/matriculas"
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inscrições Recentes */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Inscrições Recentes
            </h3>
            <div className="flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {Array.isArray(recentInscricoes) && recentInscricoes.map((inscricao) => (
                  <li key={inscricao.id} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <UserGroupIcon className="h-4 w-4 text-gray-500" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {inscricao.nome}
                        </p>
                        <p className="text-sm text-gray-500">
                          {inscricao.curso} • {inscricao.data}
                        </p>
                      </div>
                      <div>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(inscricao.status)}`}>
                          {inscricao.status}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6">
              <Link
                to="/admin/inscricoes"
                className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Ver todas as inscrições
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Ações Rápidas
            </h3>
            <div className="space-y-4">
              <Link
                to="/admin/alunos/new"
                className="block w-full text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Novo Aluno
              </Link>
              <Link
                to="/admin/cursos/new"
                className="block w-full text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
              >
                Novo Curso
              </Link>
              <Link
                to="/admin/inscricoes/new"
                className="block w-full text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700"
              >
                Nova Inscrição
              </Link>
              <Link
                to="/admin/relatorios"
                className="block w-full text-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Gerar Relatórios
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
