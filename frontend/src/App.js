import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import InscricaoForm from './components/InscricaoForm';

function HomePage() {
  const [message, setMessage] = React.useState('');
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Conectar à API do backend
    const apiUrl = process.env.REACT_APP_API_URL || 'https://seu-backend.railway.app';
    
    console.log('Tentando conectar à API:', apiUrl);
    
    axios.get(`${apiUrl}/`)
      .then(response => {
        console.log('Resposta da API:', response.data);
        setMessage(response.data.message);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro completo:', error);
        console.error('Status:', error.response?.status);
        console.error('Mensagem:', error.message);
        setMessage(`Erro: ${error.message}`);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif',
      background: 'linear-gradient(135deg, #8B4513 0%, #D2691E 100%)',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '3rem',
        borderRadius: '15px',
        boxShadow: '0 8px 32px rgba(139, 69, 19, 0.3)',
        textAlign: 'center',
        maxWidth: '500px',
        width: '100%',
        border: '2px solid #D2691E'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          backgroundColor: '#FF8C00',
          borderRadius: '50%',
          margin: '0 auto 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2rem',
          color: 'white',
          fontWeight: 'bold'
        }}>
          M&L
        </div>
        
        <h1 style={{ 
          color: '#8B4513', 
          marginBottom: '1rem',
          fontSize: '2rem',
          fontWeight: 'bold'
        }}>
          Sistema de Inscrições e Matrículas
        </h1>
        
        <div style={{
          backgroundColor: '#FFF8DC',
          padding: '1rem',
          borderRadius: '8px',
          margin: '1.5rem 0',
          border: '1px solid #D2691E'
        }}>
          <h2 style={{ 
            color: '#8B4513', 
            fontSize: '1.2rem',
            marginBottom: '0.5rem'
          }}>
            Bem-vindo ao Colégio Mara e Lu!
          </h2>
          <p style={{ 
            color: '#654321', 
            margin: '0',
            fontSize: '0.95rem'
          }}>
            Sistema online para inscrições e matrículas
          </p>
        </div>
        
        {loading ? (
          <div style={{ color: '#FF8C00' }}>
            <div style={{
              display: 'inline-block',
              width: '20px',
              height: '20px',
              border: '3px solid #D2691E',
              borderTop: '3px solid #FF8C00',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              marginRight: '10px'
            }}></div>
            Carregando sistema...
          </div>
        ) : (
          <div>
            <p style={{ 
              color: '#654321',
              fontSize: '1rem',
              marginBottom: '1.5rem'
            }}>
              Status do Backend: <strong style={{ color: '#FF8C00' }}>{message}</strong>
            </p>
            
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center'
            }}>
              <Link 
                to="/inscricao"
                style={{
                  backgroundColor: '#FF8C00',
                  color: 'white',
                  textDecoration: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  transition: 'all 0.3s',
                  display: 'inline-block'
                }}
              >
                Fazer Inscrição
              </Link>
              <button style={{
                backgroundColor: '#8B4513',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                fontSize: '1rem',
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'all 0.3s'
              }}>
                Consultar Matrícula
              </button>
            </div>
          </div>
        )}
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

function Navbar() {
  return (
    <nav style={{
      backgroundColor: '#8B4513',
      padding: '1rem 2rem',
      boxShadow: '0 2px 10px rgba(139, 69, 19, 0.3)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            backgroundColor: '#FF8C00',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold'
          }}>
            M&L
          </div>
          <span style={{
            color: 'white',
            fontSize: '1.2rem',
            fontWeight: 'bold'
          }}>
            Colégio Mara e Lu
          </span>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link 
            to="/"
            style={{
              color: 'white',
              textDecoration: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '5px',
              transition: 'background-color 0.3s'
            }}
          >
            Início
          </Link>
          <Link 
            to="/inscricao"
            style={{
              color: 'white',
              textDecoration: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '5px',
              transition: 'background-color 0.3s'
            }}
          >
            Inscrição
          </Link>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div style={{ minHeight: '100vh' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/inscricao" element={
            <div style={{
              background: 'linear-gradient(135deg, #8B4513 0%, #D2691E 100%)',
              minHeight: 'calc(100vh - 70px)',
              padding: '2rem'
            }}>
              <InscricaoForm />
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
