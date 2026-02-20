import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  HomeIcon,
  UserGroupIcon,
  AcademicCapIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const menuItems = [
    { name: 'Dashboard', href: '/admin', icon: HomeIcon },
    { name: 'Alunos', href: '/admin/alunos', icon: UserGroupIcon },
    { name: 'Cursos', href: '/admin/cursos', icon: AcademicCapIcon },
    { name: 'Inscrições', href: '/admin/inscricoes', icon: DocumentTextIcon },
    { name: 'Matrículas', href: '/admin/matriculas', icon: DocumentTextIcon },
    { name: 'Pagamentos', href: '/admin/pagamentos', icon: CurrencyDollarIcon },
    { name: 'Relatórios', href: '/admin/relatorios', icon: ChartBarIcon },
  ];

  const isActive = (href) => {
    if (href === '/admin') {
      return location.pathname === '/admin' || location.pathname === '/admin/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-[#FDF8F5] flex">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex lg:flex-col lg:w-72 lg:fixed lg:inset-y-0 shadow-2xl z-20 overflow-hidden">
        <div className="flex flex-col flex-grow bg-gradient-to-b from-[#2C1810] to-[#4A2C1A] pt-6 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-6 mb-10">
            <div className="bg-gradient-to-br from-[#FF8C00] to-[#FF6B35] p-2 rounded-xl shadow-lg transform -rotate-3 mr-3">
              <span className="text-white font-bold text-xl">M&L</span>
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
              Painel Admin
            </h1>
          </div>
          <nav className="flex-1 px-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 ${active
                    ? 'bg-gradient-to-r from-[#FF8C00] to-[#FF6B35] text-white shadow-lg transform scale-105'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                >
                  <Icon className={`mr-3 h-5 w-5 flex-shrink-0 transition-colors ${active ? 'text-white' : 'text-[#FF8C00]'}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          <div className="px-4 mt-auto">
            <button
              onClick={handleLogout}
              className="group flex items-center w-full px-4 py-3 text-sm font-medium rounded-xl text-gray-300 hover:bg-red-500/10 hover:text-red-400 transition-all duration-300 border border-transparent hover:border-red-500/20"
            >
              <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5 flex-shrink-0 text-red-500" />
              Sair do Sistema
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-72 flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200">
          <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <button
              type="button"
              className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setSidebarOpen(true)}
            >
              <Bars3Icon className="h-6 w-6" />
            </button>

            <div className="flex-1 flex justify-between items-center sm:ml-4">
              <h2 className="text-xl font-bold text-gray-800 tracking-tight">
                {menuItems.find(item => isActive(item.href))?.name || 'Administração'}
              </h2>
              <div className="flex items-center gap-4">
                <span className="hidden sm:block text-sm text-gray-500">
                  Bem-vindo, <strong>Administrador</strong>
                </span>
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#FF8C00] to-[#FF6B35] flex items-center justify-center text-white font-bold shadow-md">
                  A
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 lg:p-10">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>

        {/* Mobile sidebar (Overlay) */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" onClick={() => setSidebarOpen(false)} />
            <div className="fixed inset-y-0 left-0 w-72 bg-[#2C1810] shadow-2xl flex flex-col animate-slide-in">
              <div className="flex items-center justify-between px-6 py-6 border-b border-white/5">
                <h1 className="text-white font-bold text-xl">Menu</h1>
                <button onClick={() => setSidebarOpen(false)}>
                  <XMarkIcon className="h-6 w-6 text-gray-400" />
                </button>
              </div>
              {/* Similar Nav as Desktop ... simplified for brevity here */}
              <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all ${isActive(item.href) ? 'bg-[#FF8C00] text-white' : 'text-gray-300'
                      }`}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slide-in {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in {
          animation: slide-in 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
};

export default AdminLayout;
