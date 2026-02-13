import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import InscricaoForm from './components/InscricaoForm';
import Footer from './components/Footer';
import SobrePage from './components/SobrePage';
import CursosPage from './components/CursosPage';
import ContatoPage from './components/ContatoPage';

function HomePage() {
  const [message, setMessage] = React.useState('');
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
      {/* Hero Section */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
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
          maxWidth: '700px',
          width: '100%',
          border: '1px solid rgba(255, 140, 0, 0.3)',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{
            width: '120px',
            height: '120px',
            background: 'linear-gradient(135deg, #FF8C00 0%, #FF6B35 100%)',
            borderRadius: '25px',
            margin: '0 auto 2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3rem',
            color: 'white',
            fontWeight: 'bold',
            boxShadow: '0 10px 30px rgba(255, 140, 0, 0.3)',
            transform: 'rotate(-5deg)',
            animation: 'float 3s ease-in-out infinite'
          }}>
            M&L
          </div>
          
          <h1 style={{ 
            color: '#2C1810', 
            marginBottom: '1.5rem',
            fontSize: '3rem',
            fontWeight: '300',
            letterSpacing: '-1px',
            lineHeight: '1.1'
          }}>
            Colégio Mara e Lú
          </h1>
          
          <h2 style={{ 
            color: '#4A2C1A', 
            marginBottom: '2rem',
            fontSize: '1.8rem',
            fontWeight: '400'
          }}>
            Sistema de Inscrições e Matrículas Digital
          </h2>
          
          <p style={{ 
            color: '#6B4423', 
            fontSize: '1.2rem',
            lineHeight: '1.6',
            marginBottom: '2.5rem',
            maxWidth: '500px',
            margin: '0 auto 2.5rem'
          }}>
            Gestão eficiente e moderna do processo de matrículas. 
            Inscrição online, acompanhamento em tempo real e atendimento personalizado.
          </p>
          
          {loading ? (
            <div style={{ color: '#FF8C00', fontSize: '1.2rem' }}>
              <div style={{
                display: 'inline-block',
                width: '28px',
                height: '28px',
                border: '3px solid rgba(255, 140, 0, 0.2)',
                borderTop: '3px solid #FF8C00',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                marginRight: '15px',
                verticalAlign: 'middle'
              }}></div>
              Inicializando sistema...
            </div>
          ) : (
            <div>
              <div style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'center',
                flexWrap: 'wrap',
                marginBottom: '2rem'
              }}>
                <Link 
                  to="/inscricao"
                  style={{
                    background: 'linear-gradient(135deg, #FF8C00 0%, #FF6B35 100%)',
                    color: 'white',
                    textDecoration: 'none',
                    padding: '1.25rem 2.5rem',
                    borderRadius: '15px',
                    fontSize: '1.2rem',
                    cursor: 'pointer',
                    fontWeight: '600',
                    transition: 'all 0.3s ease',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    boxShadow: '0 10px 30px rgba(255, 140, 0, 0.25)'
                  }}
                >
                  <span>📝</span> Nova Inscrição
                </Link>
                <button style={{
                  background: 'linear-gradient(135deg, #4A2C1A 0%, #2C1810 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '1.25rem 2.5rem',
                  borderRadius: '15px',
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  boxShadow: '0 10px 30px rgba(74, 44, 26, 0.25)'
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
        `}</style>
      </section>

      {/* Stats Section */}
      <section style={{
        padding: '5rem 2rem',
        background: 'linear-gradient(135deg, rgba(44, 24, 16, 0.95) 0%, rgba(74, 44, 26, 0.95) 100%)',
        position: 'relative'
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
            Nossos Números
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              padding: '2.5rem',
              borderRadius: '20px',
              textAlign: 'center',
              border: '1px solid rgba(255, 140, 0, 0.2)',
              transition: 'all 0.3s ease'
            }}>
              <div style={{
                fontSize: '3rem',
                color: '#FF8C00',
                marginBottom: '1rem',
                fontWeight: 'bold'
              }}>
                {stats.totalInscricoes}
              </div>
              <h3 style={{
                color: 'white',
                fontSize: '1.3rem',
                marginBottom: '0.5rem',
                fontWeight: '500'
              }}>
                Inscrições Realizadas
              </h3>
              <p style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '1rem',
                margin: '0'
              }}>
                Neste ano letivo
              </p>
            </div>

            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              padding: '2.5rem',
              borderRadius: '20px',
              textAlign: 'center',
              border: '1px solid rgba(255, 140, 0, 0.2)',
              transition: 'all 0.3s ease'
            }}>
              <div style={{
                fontSize: '3rem',
                color: '#FF8C00',
                marginBottom: '1rem',
                fontWeight: 'bold'
              }}>
                {stats.vagasDisponiveis}
              </div>
              <h3 style={{
                color: 'white',
                fontSize: '1.3rem',
                marginBottom: '0.5rem',
                fontWeight: '500'
              }}>
                Vagas Disponíveis
              </h3>
              <p style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '1rem',
                margin: '0'
              }}>
                Para o próximo semestre
              </p>
            </div>

            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              padding: '2.5rem',
              borderRadius: '20px',
              textAlign: 'center',
              border: '1px solid rgba(255, 140, 0, 0.2)',
              transition: 'all 0.3s ease'
            }}>
              <div style={{
                fontSize: '3rem',
                color: '#FF8C00',
                marginBottom: '1rem',
                fontWeight: 'bold'
              }}>
                {stats.seriesOferecidas}
              </div>
              <h3 style={{
                color: 'white',
                fontSize: '1.3rem',
                marginBottom: '0.5rem',
                fontWeight: '500'
              }}>
                Séries Oferecidas
              </h3>
              <p style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '1rem',
                margin: '0'
              }}>
                Do Fundamental I ao II
              </p>
            </div>
          </div>
        </div>
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
      padding: '1rem 2rem',
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
              Colégio Mara e Lú
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
        
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
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
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
