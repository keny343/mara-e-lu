import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
  const [formData, setFormData] = React.useState({
    email: '',
    senha: ''
  });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    console.log('=== DEBUG FRONTEND LOGIN ===');
    console.log('API URL:', process.env.REACT_APP_API_URL || 'https://mara-e-lu-backend.up.railway.app');
    console.log('Form data ANTES de enviar:', formData);
    console.log('Email:', formData.email, 'Senha:', formData.senha);

    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'https://mara-e-lu-backend.up.railway.app';
      console.log('Fazendo request para:', `${apiUrl}/api/auth/login`);
      
      // Enviar dados manualmente para garantir
      const requestData = {
        email: formData.email,
        senha: formData.senha
      };
      
      console.log('Request data manual:', requestData);
      
      const response = await axios.post(`${apiUrl}/api/auth/login`, requestData);
      console.log('Resposta da API:', response.data);
      
      // Armazenar token
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.usuario));
      
      // Redirecionar para dashboard (implementar depois)
      alert('Login realizado com sucesso!');
      
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao fazer login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #2C1810 0%, #4A2C1A 50%, #6B4423 100%)',
      minHeight: 'calc(100vh - 90px)',
      padding: '2rem',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Elementos decorativos */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(255,140,0,0.08) 0%, transparent 70%)',
        borderRadius: '50%'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '10%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(107,68,35,0.08) 0%, transparent 70%)',
        borderRadius: '50%'
      }}></div>
      
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        padding: '4rem',
        borderRadius: '20px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        border: '1px solid rgba(255, 140, 0, 0.2)',
        position: 'relative',
        zIndex: 1,
        maxWidth: '500px',
        width: '100%'
      }}>
        {/* Logo */}
        <div style={{
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #FF8C00 0%, #FF6B35 100%)',
            borderRadius: '20px',
            margin: '0 auto 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            color: 'white',
            fontWeight: 'bold',
            boxShadow: '0 8px 25px rgba(255, 140, 0, 0.3)',
            transform: 'rotate(-5deg)'
          }}>
            M&L
          </div>
          <h1 style={{
            color: '#2C1810',
            fontSize: '2rem',
            fontWeight: '600',
            margin: '0 0 0.5rem 0'
          }}>
            Bem-vindo(a)
          </h1>
          <p style={{
            color: '#6B4423',
            fontSize: '1.1rem',
            margin: '0'
          }}>
            Colégio Mara e Lú - Portal Administrativo
          </p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              color: '#4A2C1A',
              marginBottom: '0.75rem',
              fontWeight: '600',
              fontSize: '0.95rem'
            }}>
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="seu@email.com"
              style={{
                width: '100%',
                padding: '1rem 1.25rem',
                border: '2px solid rgba(107, 68, 35, 0.2)',
                borderRadius: '12px',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#FF8C00';
                e.target.style.boxShadow = '0 0 0 3px rgba(255, 140, 0, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(107, 68, 35, 0.2)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{
              display: 'block',
              color: '#4A2C1A',
              marginBottom: '0.75rem',
              fontWeight: '600',
              fontSize: '0.95rem'
            }}>
              Senha *
            </label>
            <input
              type="password"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              required
              placeholder="Digite sua senha"
              style={{
                width: '100%',
                padding: '1rem 1.25rem',
                border: '2px solid rgba(107, 68, 35, 0.2)',
                borderRadius: '12px',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#FF8C00';
                e.target.style.boxShadow = '0 0 0 3px rgba(255, 140, 0, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(107, 68, 35, 0.2)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {error && (
            <div style={{
              backgroundColor: 'rgba(220, 53, 69, 0.1)',
              border: '1px solid rgba(220, 53, 69, 0.3)',
              color: '#dc3545',
              padding: '1rem',
              borderRadius: '8px',
              marginBottom: '1.5rem',
              fontSize: '0.9rem'
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              background: loading 
                ? 'linear-gradient(135deg, #6B4423 0%, #4A2C1A 100%)'
                : 'linear-gradient(135deg, #FF8C00 0%, #FF6B35 100%)',
              color: 'white',
              border: 'none',
              padding: '1.25rem 2rem',
              borderRadius: '15px',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: loading ? 'none' : '0 8px 25px rgba(255, 140, 0, 0.3)',
              opacity: loading ? 0.7 : 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem'
            }}
            onMouseOver={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 12px 30px rgba(255, 140, 0, 0.4)';
              }
            }}
            onMouseOut={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 25px rgba(255, 140, 0, 0.3)';
              }
            }}
          >
            {loading ? (
              <>
                <div style={{
                  width: '20px',
                  height: '20px',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  borderTop: '2px solid white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
                Entrando...
              </>
            ) : (
              <>
                <span>🔐</span>
                Entrar no Sistema
              </>
            )}
          </button>
        </form>

        {/* Links úteis */}
        <div style={{
          marginTop: '2rem',
          textAlign: 'center',
          paddingTop: '2rem',
          borderTop: '1px solid rgba(107, 68, 35, 0.2)'
        }}>
          <div style={{ marginBottom: '1rem' }}>
            <Link 
              to="#"
              style={{
                color: '#FF8C00',
                textDecoration: 'none',
                fontSize: '0.95rem',
                fontWeight: '500',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.color = '#FF6B35';
                e.target.style.textDecoration = 'underline';
              }}
              onMouseOut={(e) => {
                e.target.style.color = '#FF8C00';
                e.target.style.textDecoration = 'none';
              }}
            >
              Esqueci minha senha
            </Link>
          </div>
          
          <div style={{
            color: '#6B4423',
            fontSize: '0.95rem'
          }}>
            Não tem uma conta?{' '}
            <Link 
              to="/inscricao"
              style={{
                color: '#FF8C00',
                textDecoration: 'none',
                fontWeight: '500',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.color = '#FF6B35';
                e.target.style.textDecoration = 'underline';
              }}
              onMouseOut={(e) => {
                e.target.style.color = '#FF8C00';
                e.target.style.textDecoration = 'none';
              }}
            >
              Faça uma inscrição
            </Link>
          </div>
        </div>

        {/* Informações de contato */}
        <div style={{
          marginTop: '2rem',
          textAlign: 'center',
          padding: '1rem',
          backgroundColor: 'linear-gradient(135deg, #FFF8F0 0%, #F5E6D3 100%)',
          borderRadius: '12px',
          border: '1px solid rgba(255, 140, 0, 0.2)'
        }}>
          <p style={{
            color: '#6B4423',
            fontSize: '0.85rem',
            margin: '0'
          }}>
            Precisa de ajuda?{' '}
            <span style={{ fontWeight: '600', color: '#4A2C1A' }}>
              +244 946 340 172
            </span>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default LoginPage;
