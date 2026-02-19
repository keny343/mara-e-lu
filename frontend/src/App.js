import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import InscricaoForm from './components/InscricaoForm';
import Footer from './components/Footer';
import SobrePage from './components/SobrePage';
import CursosPage from './components/CursosPage';
import ContatoPage from './components/ContatoPage';
import LoginPage from './components/LoginPage';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './components/admin/Dashboard';
import AlunosList from './components/admin/AlunosList';
import CursosList from './components/admin/CursosList';
import InscricoesList from './components/admin/InscricoesList';
import MatriculasList from './components/admin/MatriculasList';
import ProtectedRoute from './components/admin/ProtectedRoute';

function HomePage() {
  const [loading, setLoading] = React.useState(true);
  const [stats, setStats] = React.useState({
    totalInscricoes: 0,
    vagasDisponiveis: 0,
    seriesOferecidas: 0
  });

  React.useEffect(() => {
    // Conectar à API do backend
    const apiUrl = process.env.REACT_APP_API_URL || 'https://seu-backend.railway.app';
    
    console.log('Tentando conectar à API:', apiUrl);
    
    axios.get(`${apiUrl}/`)
      .then(response => {
        console.log('Resposta da API:', response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro completo:', error);
        console.error('Status:', error.response?.status);
        console.error('Mensagem:', error.message);
        setLoading(false);
      });

    // Simular dados de estatísticas
    setStats({
      totalInscricoes: 247,
      vagasDisponiveis: 38,
      seriesOferecidas: 9
    });
  }, []);

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #2C1810 0%, #4A2C1A 50%, #6B4423 100%)',
      position: 'relative'
    }}>
      {/* Hero Section - Mobile First */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        position: 'relative'
      }}>
        {/* Elementos decorativos de fundo */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '100px',
          height: '100px',
          background: 'radial-gradient(circle, rgba(255,140,0,0.08) 0%, transparent 70%)',
          borderRadius: '50%'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: '150px',
          height: '150px',
          background: 'radial-gradient(circle, rgba(139,69,19,0.08) 0%, transparent 70%)',
          borderRadius: '50%'
        }}></div>
        
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          padding: '2rem',
          borderRadius: '20px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          textAlign: 'center',
          maxWidth: '700px',
          width: '100%',
          border: '1px solid rgba(255, 140, 0, 0.3)',
          position: 'relative',
          zIndex: 1
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
            transform: 'rotate(-5deg)',
            animation: 'float 3s ease-in-out infinite'
          }}>
            M&L
          </div>
          
          <h1 style={{ 
            color: '#2C1810', 
            marginBottom: '1rem',
            fontSize: '1.8rem',
            fontWeight: '300',
            letterSpacing: '-0.5px',
            lineHeight: '1.2'
          }}>
            Colégio Mara e Lú
          </h1>
          
          <h2 style={{ 
            color: '#4A2C1A', 
            marginBottom: '1.5rem',
            fontSize: '1.2rem',
            fontWeight: '400'
          }}>
            Sistema de Inscrições e Matrículas Digital
          </h2>
          
          <p style={{ 
            color: '#6B4423', 
            fontSize: '1rem',
            lineHeight: '1.6',
            marginBottom: '2rem',
            maxWidth: '400px',
            margin: '0 auto 2rem'
          }}>
            Gestão eficiente e moderna do processo de matrículas. 
            Inscrição online, acompanhamento em tempo real e atendimento personalizado.
          </p>
          
          {loading ? (
            <div style={{ color: '#FF8C00', fontSize: '1rem' }}>
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
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                marginBottom: '2rem'
              }}>
                <Link 
                  to="/inscricao"
                  style={{
                    background: 'linear-gradient(135deg, #FF8C00 0%, #FF6B35 100%)',
                    color: 'white',
                    textDecoration: 'none',
                    padding: '1rem 2rem',
                    borderRadius: '15px',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    fontWeight: '600',
                    transition: 'all 0.3s ease',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.75rem',
                    boxShadow: '0 8px 25px rgba(255, 140, 0, 0.25)'
                  }}
                >
                  <span>📝</span> Nova Inscrição
                </Link>
                <button style={{
                  background: 'linear-gradient(135deg, #4A2C1A 0%, #2C1810 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '1rem 2rem',
                  borderRadius: '15px',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem',
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
          @keyframes float {
            0%, 100% { transform: rotate(-5deg) translateY(0px); }
            50% { transform: rotate(-5deg) translateY(-10px); }
          }
          
          @media (min-width: 768px) {
            section {
              padding: 2rem !important;
            }
            div[style*="padding: '2rem'"] {
              padding: 4rem !important;
            }
            h1 {
              font-size: 3rem !important;
            }
            h2 {
              font-size: 1.8rem !important;
            }
            p {
              font-size: 1.2rem !important;
            }
            div[style*="flexDirection: 'column'"] {
              flexDirection: row !important;
              gap: 1rem !important;
            }
            div[style*="width: '80px'"] {
              width: 120px !important;
              height: 120px !important;
              font-size: 3rem !important;
            }
          }
        `}</style>
      </section>

      {/* Stats Section - Mobile First */}
      <section style={{
        padding: '3rem 1rem',
        background: 'linear-gradient(135deg, rgba(44, 24, 16, 0.95) 0%, rgba(74, 44, 26, 0.95) 100%)',
        position: 'relative'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <h2 style={{
            color: 'white',
            fontSize: '1.8rem',
            textAlign: 'center',
            marginBottom: '2rem',
            fontWeight: '300'
          }}>
            Nossos Números
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '1.5rem'
          }}>
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              padding: '2rem',
              borderRadius: '20px',
              textAlign: 'center',
              border: '1px solid rgba(255, 140, 0, 0.2)',
              transition: 'all 0.3s ease'
            }}>
              <div style={{
                fontSize: '2.5rem',
                color: '#FF8C00',
                marginBottom: '1rem',
                fontWeight: 'bold'
              }}>
                {stats.totalInscricoes}
              </div>
              <h3 style={{
                color: 'white',
                fontSize: '1.2rem',
                marginBottom: '0.5rem',
                fontWeight: '500'
              }}>
                Inscrições Realizadas
              </h3>
              <p style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '0.9rem',
                margin: '0'
              }}>
                Neste ano letivo
              </p>
            </div>

            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              padding: '2rem',
              borderRadius: '20px',
              textAlign: 'center',
              border: '1px solid rgba(255, 140, 0, 0.2)',
              transition: 'all 0.3s ease'
            }}>
              <div style={{
                fontSize: '2.5rem',
                color: '#FF8C00',
                marginBottom: '1rem',
                fontWeight: 'bold'
              }}>
                {stats.vagasDisponiveis}
              </div>
              <h3 style={{
                color: 'white',
                fontSize: '1.2rem',
                marginBottom: '0.5rem',
                fontWeight: '500'
              }}>
                Vagas Disponíveis
              </h3>
              <p style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '0.9rem',
                margin: '0'
              }}>
                Para o próximo semestre
              </p>
            </div>

            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              padding: '2rem',
              borderRadius: '20px',
              textAlign: 'center',
              border: '1px solid rgba(255, 140, 0, 0.2)',
              transition: 'all 0.3s ease'
            }}>
              <div style={{
                fontSize: '2.5rem',
                color: '#FF8C00',
                marginBottom: '1rem',
                fontWeight: 'bold'
              }}>
                {stats.seriesOferecidas}
              </div>
              <h3 style={{
                color: 'white',
                fontSize: '1.2rem',
                marginBottom: '0.5rem',
                fontWeight: '500'
              }}>
                Séries Oferecidas
              </h3>
              <p style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '0.9rem',
                margin: '0'
              }}>
                Do Fundamental I ao II
              </p>
            </div>
          </div>
        </div>
        
        <style>{`
          @media (min-width: 768px) {
            section {
              padding: 5rem 2rem !important;
            }
            h2 {
              font-size: 2.5rem !important;
              marginBottom: 3rem !important;
            }
            div[style*="gridTemplateColumns: '1fr'"] {
              gridTemplateColumns: repeat(3, 1fr) !important;
              gap: 2rem !important;
            }
            div[style*="padding: '2rem'"] {
              padding: 2.5rem !important;
            }
            div[style*="fontSize: '2.5rem'"] {
              font-size: 3rem !important;
            }
            h3[style*="fontSize: '1.2rem'"] {
              font-size: 1.3rem !important;
            }
            p[style*="fontSize: '0.9rem'"] {
              font-size: 1rem !important;
            }
          }
        `}</style>
      </section>

      {/* Features Section */}
      <section style={{
        padding: '5rem 2rem',
        background: 'linear-gradient(135deg, #4A2C1A 0%, #6B4423 100%)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <h2 style={{
            color: 'white',
            fontSize: '2.5rem',
            textAlign: 'center',
            marginBottom: '3rem',
            fontWeight: '300'
          }}>
            Por que escolher nosso sistema?
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem'
          }}>
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              padding: '2.5rem',
              borderRadius: '20px',
              boxShadow: '0 15px 40px rgba(0, 0, 0, 0.2)',
              transition: 'all 0.3s ease'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #FF8C00 0%, #FF6B35 100%)',
                borderRadius: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                marginBottom: '1.5rem'
              }}>
                🚀
              </div>
              <h3 style={{
                color: '#2C1810',
                fontSize: '1.5rem',
                marginBottom: '1rem',
                fontWeight: '600'
              }}>
                Inscrição Online
              </h3>
              <p style={{
                color: '#6B4423',
                fontSize: '1rem',
                lineHeight: '1.6',
                margin: '0'
              }}>
                Processo 100% digital, preencha o formulário a qualquer hora e de qualquer lugar. 
                Sem filas, sem burocracia.
              </p>
            </div>

            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              padding: '2.5rem',
              borderRadius: '20px',
              boxShadow: '0 15px 40px rgba(0, 0, 0, 0.2)',
              transition: 'all 0.3s ease'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #FF8C00 0%, #FF6B35 100%)',
                borderRadius: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                marginBottom: '1.5rem'
              }}>
                📊
              </div>
              <h3 style={{
                color: '#2C1810',
                fontSize: '1.5rem',
                marginBottom: '1rem',
                fontWeight: '600'
              }}>
                Acompanhamento em Tempo Real
              </h3>
              <p style={{
                color: '#6B4423',
                fontSize: '1rem',
                lineHeight: '1.6',
                margin: '0'
              }}>
                Acompanhe o status da sua inscrição pela plataforma. 
                Receba atualizações por email sobre cada etapa do processo.
              </p>
            </div>

            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              padding: '2.5rem',
              borderRadius: '20px',
              boxShadow: '0 15px 40px rgba(0, 0, 0, 0.2)',
              transition: 'all 0.3s ease'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #FF8C00 0%, #FF6B35 100%)',
                borderRadius: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                marginBottom: '1.5rem'
              }}>
                🎓
              </div>
              <h3 style={{
                color: '#2C1810',
                fontSize: '1.5rem',
                marginBottom: '1rem',
                fontWeight: '600'
              }}>
                Educação de Qualidade
              </h3>
              <p style={{
                color: '#6B4423',
                fontSize: '1rem',
                lineHeight: '1.6',
                margin: '0'
              }}>
                Mais de 20 anos de tradição em educação infantil e fundamental. 
                Professores qualificados e estrutura moderna.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '5rem 2rem',
        background: 'linear-gradient(135deg, #2C1810 0%, #4A2C1A 100%)',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <h2 style={{
            color: 'white',
            fontSize: '2.5rem',
            marginBottom: '1.5rem',
            fontWeight: '300'
          }}>
            Pronto para fazer parte do Colégio Mara e Lu?
          </h2>
          <p style={{
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '1.3rem',
            marginBottom: '3rem',
            lineHeight: '1.6'
          }}>
            Garanta já a vaga do seu filho. Nosso processo de inscrição é rápido e simples.
          </p>
          
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
                padding: '1.5rem 3rem',
                borderRadius: '15px',
                fontSize: '1.3rem',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                boxShadow: '0 10px 30px rgba(255, 140, 0, 0.3)'
              }}
            >
              <span>📝</span> Inscrever Agora
            </Link>
            <button style={{
              background: 'transparent',
              color: 'white',
              border: '2px solid rgba(255, 140, 0, 0.5)',
              padding: '1.5rem 3rem',
              borderRadius: '15px',
              fontSize: '1.3rem',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'all 0.3s ease'
            }}>
              Saiba Mais
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav style={{
      background: isScrolled 
        ? 'linear-gradient(135deg, rgba(44, 24, 16, 0.95) 0%, rgba(74, 44, 26, 0.95) 100%)'
        : 'linear-gradient(135deg, #2C1810 0%, #4A2C1A 100%)',
      padding: '1rem',
      boxShadow: isScrolled ? '0 4px 30px rgba(0, 0, 0, 0.4)' : '0 4px 20px rgba(0, 0, 0, 0.3)',
      borderBottom: '1px solid rgba(255, 140, 0, 0.2)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      backdropFilter: 'blur(10px)',
      transition: 'all 0.3s ease'
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
          gap: '0.75rem'
        }}>
          <div style={{
            width: '35px',
            height: '35px',
            background: 'linear-gradient(135deg, #FF8C00 0%, #FF6B35 100%)',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '0.9rem',
            boxShadow: '0 4px 15px rgba(255, 140, 0, 0.3)',
            transform: 'rotate(-3deg)'
          }}>
            M&L
          </div>
          <div>
            <span style={{
              color: 'white',
              fontSize: '1rem',
              fontWeight: '600',
              display: 'block',
              lineHeight: '1.2'
            }}>
              Colégio Mara e Lú
            </span>
            <span style={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '0.75rem',
              display: 'block',
              lineHeight: '1'
            }}>
              Sistema de Matrículas
            </span>
          </div>
        </div>
        
        {/* Desktop Menu */}
        <div style={{ 
          display: 'none', 
          gap: '0.5rem', 
          alignItems: 'center' 
        }}>
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
            to="/sobre"
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
            Sobre
          </Link>
          <Link 
            to="/cursos"
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
            Cursos
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
          <Link 
            to="/login"
            style={{
              background: 'linear-gradient(135deg, #4A2C1A 0%, #2C1810 100%)',
              color: 'white',
              textDecoration: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '10px',
              transition: 'all 0.3s ease',
              fontSize: '0.95rem',
              fontWeight: '600',
              boxShadow: '0 4px 15px rgba(74, 44, 26, 0.3)',
              border: '1px solid rgba(74, 44, 26, 0.3)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(74, 44, 26, 0.4)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(74, 44, 26, 0.3)';
            }}
          >
            <span>🔐</span>
            Login
          </Link>
          <Link 
            to="/contato"
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
            Contato
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '1.5rem',
            cursor: 'pointer',
            padding: '0.5rem',
            borderRadius: '8px',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = 'rgba(255, 140, 0, 0.2)';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = 'transparent';
          }}
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: '0',
          right: '0',
          background: 'linear-gradient(135deg, #2C1810 0%, #4A2C1A 100%)',
          borderBottom: '1px solid rgba(255, 140, 0, 0.2)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          zIndex: 999
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '1rem',
            gap: '0.5rem'
          }}>
            <Link 
              to="/"
              style={{
                color: 'white',
                textDecoration: 'none',
                padding: '1rem',
                borderRadius: '10px',
                transition: 'all 0.3s ease',
                fontSize: '1rem',
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
              onClick={() => setIsMobileMenuOpen(false)}
            >
              🏠 Início
            </Link>
            <Link 
              to="/sobre"
              style={{
                color: 'white',
                textDecoration: 'none',
                padding: '1rem',
                borderRadius: '10px',
                transition: 'all 0.3s ease',
                fontSize: '1rem',
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
              onClick={() => setIsMobileMenuOpen(false)}
            >
              📖 Sobre
            </Link>
            <Link 
              to="/cursos"
              style={{
                color: 'white',
                textDecoration: 'none',
                padding: '1rem',
                borderRadius: '10px',
                transition: 'all 0.3s ease',
                fontSize: '1rem',
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
              onClick={() => setIsMobileMenuOpen(false)}
            >
              📚 Cursos
            </Link>
            <Link 
              to="/inscricao"
              style={{
                background: 'linear-gradient(135deg, #FF8C00 0%, #FF6B35 100%)',
                color: 'white',
                textDecoration: 'none',
                padding: '1rem',
                borderRadius: '10px',
                transition: 'all 0.3s ease',
                fontSize: '1rem',
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
              onClick={() => setIsMobileMenuOpen(false)}
            >
              📝 Inscrição
            </Link>
            <Link 
              to="/login"
              style={{
                background: 'linear-gradient(135deg, #4A2C1A 0%, #2C1810 100%)',
                color: 'white',
                textDecoration: 'none',
                padding: '1rem',
                borderRadius: '10px',
                transition: 'all 0.3s ease',
                fontSize: '1rem',
                fontWeight: '600',
                boxShadow: '0 4px 15px rgba(74, 44, 26, 0.3)',
                border: '1px solid rgba(74, 44, 26, 0.3)'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(74, 44, 26, 0.4)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(74, 44, 26, 0.3)';
              }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              🔐 Login
            </Link>
            <Link 
              to="/contato"
              style={{
                color: 'white',
                textDecoration: 'none',
                padding: '1rem',
                borderRadius: '10px',
                transition: 'all 0.3s ease',
                fontSize: '1rem',
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
              onClick={() => setIsMobileMenuOpen(false)}
            >
              📞 Contato
            </Link>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          div[style*="display: 'none'"] {
            display: flex !important;
          }
          button[style*="fontSize: '1.5rem'"] {
            display: none !important;
          }
          div[style*="position: 'absolute'"] {
            display: none !important;
          }
        }
      `}</style>
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
          <Route path="/sobre" element={<SobrePage />} />
          <Route path="/cursos" element={<CursosPage />} />
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
          <Route path="/contato" element={<ContatoPage />} />
          <Route path="/login" element={<LoginPage />} />
          
          {/* Rotas Administrativas */}
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="alunos" element={<AlunosList />} />
            <Route path="cursos" element={<CursosList />} />
            <Route path="inscricoes" element={<InscricoesList />} />
            <Route path="matriculas" element={<MatriculasList />} />
          </Route>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
