import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer style={{
      background: 'linear-gradient(135deg, #1A0E08 0%, #2C1810 100%)',
      color: 'white',
      padding: '3rem 2rem 1.5rem',
      borderTop: '1px solid rgba(255, 140, 0, 0.2)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem'
        }}>
          {/* Colégio Info */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, #FF8C00 0%, #FF6B35 100%)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1rem'
              }}>
                M&L
              </div>
              <div>
                <h3 style={{
                  color: 'white',
                  fontSize: '1.2rem',
                  fontWeight: '600',
                  margin: '0',
                  lineHeight: '1.2'
                }}>
                  Colégio Mara e Lu
                </h3>
                <p style={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '0.85rem',
                  margin: '0'
                }}>
                  Desde 2003 educando com amor
                </p>
              </div>
            </div>
            <p style={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '0.95rem',
              lineHeight: '1.6',
              margin: '0'
            }}>
              Instituição de ensino comprometida com a formação integral dos alunos, 
              combinando tradição e inovação pedagógica.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 style={{
              color: '#FF8C00',
              fontSize: '1.1rem',
              fontWeight: '600',
              marginBottom: '1.5rem',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Links Rápidos
            </h4>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              <Link 
                to="/"
                style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  textDecoration: 'none',
                  fontSize: '0.95rem',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.color = '#FF8C00';
                  e.target.style.paddingLeft = '5px';
                }}
                onMouseOut={(e) => {
                  e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                  e.target.style.paddingLeft = '0';
                }}
              >
                → Página Inicial
              </Link>
              <Link 
                to="/sobre"
                style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  textDecoration: 'none',
                  fontSize: '0.95rem',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.color = '#FF8C00';
                  e.target.style.paddingLeft = '5px';
                }}
                onMouseOut={(e) => {
                  e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                  e.target.style.paddingLeft = '0';
                }}
              >
                → Sobre o Colégio
              </Link>
              <Link 
                to="/cursos"
                style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  textDecoration: 'none',
                  fontSize: '0.95rem',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.color = '#FF8C00';
                  e.target.style.paddingLeft = '5px';
                }}
                onMouseOut={(e) => {
                  e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                  e.target.style.paddingLeft = '0';
                }}
              >
                → Cursos Oferecidos
              </Link>
              <Link 
                to="/inscricao"
                style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  textDecoration: 'none',
                  fontSize: '0.95rem',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.color = '#FF8C00';
                  e.target.style.paddingLeft = '5px';
                }}
                onMouseOut={(e) => {
                  e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                  e.target.style.paddingLeft = '0';
                }}
              >
                → Fazer Inscrição
              </Link>
              <Link 
                to="/contato"
                style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  textDecoration: 'none',
                  fontSize: '0.95rem',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.color = '#FF8C00';
                  e.target.style.paddingLeft = '5px';
                }}
                onMouseOut={(e) => {
                  e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                  e.target.style.paddingLeft = '0';
                }}
              >
                → Contato
              </Link>
            </div>
          </div>

          {/* Contato */}
          <div>
            <h4 style={{
              color: '#FF8C00',
              fontSize: '1.1rem',
              fontWeight: '600',
              marginBottom: '1.5rem',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Contato
            </h4>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <span style={{ color: '#FF8C00', fontSize: '1.2rem' }}>📍</span>
                <div>
                  <p style={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: '0.95rem',
                    margin: '0',
                    lineHeight: '1.4'
                  }}>
                    Rua das Escolas, 123<br/>
                    Centro - Cidade/UF<br/>
                    CEP: 12.345-678
                  </p>
                </div>
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <span style={{ color: '#FF8C00', fontSize: '1.2rem' }}>📞</span>
                <p style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '0.95rem',
                  margin: '0'
                }}>
                  (00) 1234-5678
                </p>
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <span style={{ color: '#FF8C00', fontSize: '1.2rem' }}>📧</span>
                <p style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '0.95rem',
                  margin: '0'
                }}>
                  contato@colegiomaraelu.com.br
                </p>
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <span style={{ color: '#FF8C00', fontSize: '1.2rem' }}>🕐</span>
                <p style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '0.95rem',
                  margin: '0'
                }}>
                  Seg-Sex: 7h30 às 17h30<br/>
                  Sáb: 8h às 12h
                </p>
              </div>
            </div>
          </div>

          {/* Redes Sociais */}
          <div>
            <h4 style={{
              color: '#FF8C00',
              fontSize: '1.1rem',
              fontWeight: '600',
              marginBottom: '1.5rem',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Redes Sociais
            </h4>
            <p style={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '0.95rem',
              lineHeight: '1.6',
              marginBottom: '1.5rem'
            }}>
              Siga-nos nas redes sociais para ficar por dentro de todas as novidades, 
              eventos e informações importantes.
            </p>
            <div style={{
              display: 'flex',
              gap: '1rem'
            }}>
              <a 
                href="#"
                style={{
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(135deg, #FF8C00 0%, #FF6B35 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: '1.2rem',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(255, 140, 0, 0.3)'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(255, 140, 0, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(255, 140, 0, 0.3)';
                }}
              >
                📘
              </a>
              <a 
                href="#"
                style={{
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(135deg, #FF8C00 0%, #FF6B35 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: '1.2rem',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(255, 140, 0, 0.3)'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(255, 140, 0, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(255, 140, 0, 0.3)';
                }}
              >
                📷
              </a>
              <a 
                href="#"
                style={{
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(135deg, #FF8C00 0%, #FF6B35 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: '1.2rem',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(255, 140, 0, 0.3)'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(255, 140, 0, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(255, 140, 0, 0.3)';
                }}
              >
                🐦
              </a>
              <a 
                href="#"
                style={{
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(135deg, #FF8C00 0%, #FF6B35 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: '1.2rem',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(255, 140, 0, 0.3)'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(255, 140, 0, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(255, 140, 0, 0.3)';
                }}
              >
                📺
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div style={{
          borderTop: '1px solid rgba(255, 140, 0, 0.2)',
          paddingTop: '2rem',
          textAlign: 'center'
        }}>
          <p style={{
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '0.9rem',
            margin: '0'
          }}>
            © 2024 Colégio Mara e Lu. Todos os direitos reservados. | 
            Desenvolvido com ❤️ para educação de qualidade
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
