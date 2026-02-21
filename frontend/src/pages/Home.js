import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Bem-vindo ao Sistema de Inscrições
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Inscrições Abertas
            </h2>
            <p className="text-gray-600">
              Faça sua inscrição agora mesmo para os cursos disponíveis.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Área do Aluno
            </h2>
            <p className="text-gray-600">
              Acesse seu portal para acompanhar suas inscrições.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Administração
            </h2>
            <p className="text-gray-600">
              Acesso restrito para administradores do sistema.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
