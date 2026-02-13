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
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
      background: 'linear-gradient(135deg, #2C1810 0%, #4A2C1A 50%, #6B4423 100%)',
      padding: '20px',
      position: 'relative'
    }}>
      {/* Elementos decorativos de fundo */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(255,140,0,0.1) 0%, transparent 70%)',
        borderRadius: '50%'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '10%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(139,69,19,0.1) 0%, transparent 70%)',
        borderRadius: '50%'
      }}></div>
      
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        padding: '4rem',
        borderRadius: '20px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        textAlign: 'center',
        maxWidth: '600px',
        width: '100%',
        border: '1px solid rgba(255, 140, 0, 0.3)',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          width: '100px',
          height: '100px',
          background: 'linear-gradient(135deg, #FF8C00 0%, #FF6B35 100%)',
          borderRadius: '20px',
          margin: '0 auto 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2.5rem',
          color: 'white',
          fontWeight: 'bold',
          boxShadow: '0 8px 25px rgba(255, 140, 0, 0.3)',
          transform: 'rotate(-5deg)'
        }}>
          M&L
        </div>
        
        <h1 style={{ 
          color: '#2C1810', 
          marginBottom: '1.5rem',
          fontSize: '2.5rem',
          fontWeight: '300',
          letterSpacing: '-0.5px',
          lineHeight: '1.2'
        }}>
          Sistema de<br/>Inscrições e Matrículas
        </h1>
        
        <div style={{
          backgroundColor: 'linear-gradient(135deg, #FFF8F0 0%, #F5E6D3 100%)',
          padding: '1.5rem',
          borderRadius: '12px',
          margin: '2rem 0',
          border: '1px solid rgba(255, 140, 0, 0.2)',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)'
        }}>
          <h2 style={{ 
            color: '#4A2C1A', 
            fontSize: '1.3rem',
            marginBottom: '0.5rem',
            fontWeight: '500'
          }}>
            Colégio Mara e Lu
          </h2>
          <p style={{ 
            color: '#6B4423', 
            margin: '0',
            fontSize: '1rem',
            lineHeight: '1.5'
          }}>
            Plataforma digital para gestão de inscrições e matrículas
          </p>
        </div>
        
        {loading ? (
          <div style={{ color: '#FF8C00', fontSize: '1.1rem' }}>
            <div style={{
              display: 'inline-block',
              width: '24px',
              height: '24px',
              border: '3px solid rgba(255, 140, 0, 0.2)',
              borderTop: '3px solid #FF8C00',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              marginRight: '12px',
              verticalAlign: 'middle'
            }}></div>
            Inicializando sistema...
          </div>
        ) : (
          <div>
            <div style={{
              backgroundColor: 'rgba(44, 24, 16, 0.05)',
              padding: '1rem',
              borderRadius: '8px',
              marginBottom: '2rem',
              border: '1px solid rgba(107, 68, 35, 0.1)'
            }}>
              <p style={{ 
                color: '#4A2C1A',
                fontSize: '0.95rem',
                margin: '0',
                fontFamily: 'monospace'
              }}>
                <span style={{ color: '#6B4423', fontWeight: 'bold' }}>STATUS:</span> {message}
              </p>
            </div>
            
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <Link 
                to="/inscricao"
                style={{
                  background: 'linear-gradient(135deg, #FF8C00 0%, #FF6B35 100%)',
                  color: 'white',
                  textDecoration: 'none',
                  padding: '1rem 2rem',
                  borderRadius: '12px',
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 8px 25px rgba(255, 140, 0, 0.25)'
                }}
              >
                <span>→</span> Nova Inscrição
              </Link>
              <button style={{
                background: 'linear-gradient(135deg, #4A2C1A 0%, #2C1810 100%)',
                color: 'white',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '12px',
                fontSize: '1.1rem',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 8px 25px rgba(74, 44, 26, 0.25)'
              }}>
                <span>🔍</span> Consultar
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
      background: 'linear-gradient(135deg, #2C1810 0%, #4A2C1A 100%)',
      padding: '1rem 2rem',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
      borderBottom: '1px solid rgba(255, 140, 0, 0.2)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      backdropFilter: 'blur(10px)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <div style={{
            width: '45px',
            height: '45px',
            background: 'linear-gradient(135deg, #FF8C00 0%, #FF6B35 100%)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            boxShadow: '0 4px 15px rgba(255, 140, 0, 0.3)',
            transform: 'rotate(-3deg)'
          }}>
            M&L
          </div>
          <div>
            <span style={{
              color: 'white',
              fontSize: '1.3rem',
              fontWeight: '600',
              display: 'block',
              lineHeight: '1.2'
            }}>
              Colégio Mara e Lu
            </span>
            <span style={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '0.85rem',
              display: 'block',
              lineHeight: '1'
            }}>
              Sistema de Matrículas
            </span>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Link 
            to="/"
            style={{
              color: 'white',
              textDecoration: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '10px',
              transition: 'all 0.3s ease',
              fontSize: '0.95rem',
              fontWeight: '500',
              border: '1px solid transparent'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = 'rgba(255, 140, 0, 0.2)';
              e.target.style.borderColor = 'rgba(255, 140, 0, 0.3)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.borderColor = 'transparent';
            }}
          >
            Início
          </Link>
          <Link 
            to="/inscricao"
            style={{
              background: 'linear-gradient(135deg, #FF8C00 0%, #FF6B35 100%)',
              color: 'white',
              textDecoration: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '10px',
              transition: 'all 0.3s ease',
              fontSize: '0.95rem',
              fontWeight: '600',
              boxShadow: '0 4px 15px rgba(255, 140, 0, 0.3)',
              border: '1px solid rgba(255, 140, 0, 0.3)'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(255, 140, 0, 0.4)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(255, 140, 0, 0.3)';
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
              background: 'linear-gradient(135deg, #2C1810 0%, #4A2C1A 50%, #6B4423 100%)',
              minHeight: 'calc(100vh - 90px)',
              padding: '2rem',
              position: 'relative'
            }}>
              {/* Elementos decorativos */}
              <div style={{
                position: 'absolute',
                top: '5%',
                left: '5%',
                width: '150px',
                height: '150px',
                background: 'radial-gradient(circle, rgba(255,140,0,0.08) 0%, transparent 70%)',
                borderRadius: '50%'
              }}></div>
              <div style={{
                position: 'absolute',
                bottom: '10%',
                right: '5%',
                width: '200px',
                height: '200px',
                background: 'radial-gradient(circle, rgba(107,68,35,0.08) 0%, transparent 70%)',
                borderRadius: '50%'
              }}></div>
              
              <div style={{ position: 'relative', zIndex: 1 }}>
                <InscricaoForm />
              </div>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
