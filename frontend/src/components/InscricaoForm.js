import React, { useState } from 'react';
import axios from 'axios';

function InscricaoForm() {
  const [formData, setFormData] = useState({
    nome: '',
    dataNascimento: '',
    cpf: '',
    rg: '',
    nomeResponsavel: '',
    cpfResponsavel: '',
    email: '',
    telefone: '',
    endereco: '',
    serie: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensagem('');

    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'https://mara-e-lu-backend.up.railway.app';
      await axios.post(`${apiUrl}/api/alunos`, formData);
      
      setMensagem('Inscrição realizada com sucesso! Entraremos em contato em breve.');
      setFormData({
        nome: '',
        dataNascimento: '',
        cpf: '',
        rg: '',
        nomeResponsavel: '',
        cpfResponsavel: '',
        email: '',
        telefone: '',
        endereco: '',
        serie: ''
      });
    } catch (error) {
      setMensagem('Erro ao realizar inscrição. Tente novamente mais tarde.');
      console.error('Erro:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: '600px',
      margin: '0 auto',
      padding: '2rem',
      backgroundColor: 'white',
      borderRadius: '15px',
      boxShadow: '0 8px 32px rgba(139, 69, 19, 0.3)',
      border: '2px solid #D2691E'
    }}>
      <h2 style={{
        color: '#8B4513',
        textAlign: 'center',
        marginBottom: '2rem',
        fontSize: '1.8rem'
      }}>
        Formulário de Inscrição
      </h2>

      {mensagem && (
        <div style={{
          padding: '1rem',
          marginBottom: '1rem',
          borderRadius: '8px',
          textAlign: 'center',
          backgroundColor: mensagem.includes('sucesso') ? '#D4EDDA' : '#F8D7DA',
          color: mensagem.includes('sucesso') ? '#155724' : '#721C24',
          border: `1px solid ${mensagem.includes('sucesso') ? '#C3E6CB' : '#F5C6CB'}`
        }}>
          {mensagem}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ color: '#FF8C00', marginBottom: '1rem' }}>Dados do Aluno</h3>
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', color: '#8B4513', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Nome Completo *
            </label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #D2691E',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', color: '#8B4513', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Data de Nascimento *
              </label>
              <input
                type="date"
                name="dataNascimento"
                value={formData.dataNascimento}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #D2691E',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', color: '#8B4513', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Série *
              </label>
              <select
                name="serie"
                value={formData.serie}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #D2691E',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
              >
                <option value="">Selecione...</option>
                <option value="1-ano">1º Ano</option>
                <option value="2-ano">2º Ano</option>
                <option value="3-ano">3º Ano</option>
                <option value="4-ano">4º Ano</option>
                <option value="5-ano">5º Ano</option>
                <option value="6-ano">6º Ano</option>
                <option value="7-ano">7º Ano</option>
                <option value="8-ano">8º Ano</option>
                <option value="9-ano">9º Ano</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', color: '#8B4513', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                CPF *
              </label>
              <input
                type="text"
                name="cpf"
                value={formData.cpf}
                onChange={handleChange}
                required
                placeholder="000.000.000-00"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #D2691E',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', color: '#8B4513', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                RG
              </label>
              <input
                type="text"
                name="rg"
                value={formData.rg}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #D2691E',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
              />
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ color: '#FF8C00', marginBottom: '1rem' }}>Dados do Responsável</h3>
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', color: '#8B4513', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Nome do Responsável *
            </label>
            <input
              type="text"
              name="nomeResponsavel"
              value={formData.nomeResponsavel}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #D2691E',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', color: '#8B4513', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                CPF do Responsável *
              </label>
              <input
                type="text"
                name="cpfResponsavel"
                value={formData.cpfResponsavel}
                onChange={handleChange}
                required
                placeholder="000.000.000-00"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #D2691E',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', color: '#8B4513', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Telefone *
              </label>
              <input
                type="tel"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                required
                placeholder="(00) 00000-0000"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #D2691E',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', color: '#8B4513', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #D2691E',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', color: '#8B4513', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Endereço *
            </label>
            <input
              type="text"
              name="endereco"
              value={formData.endereco}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #D2691E',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            backgroundColor: loading ? '#D2691E' : '#FF8C00',
            color: 'white',
            border: 'none',
            padding: '1rem',
            borderRadius: '8px',
            fontSize: '1.1rem',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: 'bold',
            transition: 'all 0.3s'
          }}
        >
          {loading ? 'Enviando...' : 'Realizar Inscrição'}
        </button>
      </form>
    </div>
  );
}

export default InscricaoForm;
