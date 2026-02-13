import React from 'react';

function ContatoPage() {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #2C1810 0%, #4A2C1A 50%, #6B4423 100%)',
      minHeight: 'calc(100vh - 90px)',
      padding: '4rem 2rem',
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
      
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          <h1 style={{
            color: 'white',
            fontSize: '2.5rem',
            fontWeight: '300',
            marginBottom: '1rem'
          }}>
            Entre em Contato
          </h1>
          <p style={{
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '1.2rem',
            margin: '0'
          }}>
            Estamos à disposição para tirar suas dúvidas
          </p>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '3rem'
        }}>
          {/* Formulário de Contato */}
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            padding: '3rem',
            borderRadius: '20px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(255, 140, 0, 0.2)'
          }}>
            <h2 style={{
              color: '#2C1810',
              fontSize: '1.8rem',
              fontWeight: '600',
              marginBottom: '2rem'
            }}>
              Envie sua Mensagem
            </h2>
            
            <form>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  color: '#4A2C1A',
                  marginBottom: '0.75rem',
                  fontWeight: '600',
                  fontSize: '0.95rem'
                }}>
                  Nome Completo *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Digite seu nome"
                  style={{
                    width: '100%',
                    padding: '1rem 1.25rem',
                    border: '2px solid rgba(107, 68, 35, 0.2)',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    fontFamily: 'inherit'
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
                    fontFamily: 'inherit'
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
              
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  color: '#4A2C1A',
                  marginBottom: '0.75rem',
                  fontWeight: '600',
                  fontSize: '0.95rem'
                }}>
                  Telefone
                </label>
                <input
                  type="tel"
                  placeholder="(00) 00000-0000"
                  style={{
                    width: '100%',
                    padding: '1rem 1.25rem',
                    border: '2px solid rgba(107, 68, 35, 0.2)',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    fontFamily: 'inherit'
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
                  Mensagem *
                </label>
                <textarea
                  required
                  rows="5"
                  placeholder="Digite sua mensagem aqui..."
                  style={{
                    width: '100%',
                    padding: '1rem 1.25rem',
                    border: '2px solid rgba(107, 68, 35, 0.2)',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    fontFamily: 'inherit',
                    resize: 'vertical'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#FF8C00';
                    e.target.style.boxShadow = '0 0 0 3px rgba(255, 140, 0, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(107, 68, 35, 0.2)';
                    e.target.style.boxShadow = 'none';
                  }}
                ></textarea>
              </div>
              
              <button
                type="submit"
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #FF8C00 0%, #FF6B35 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '1.25rem 2rem',
                  borderRadius: '15px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 8px 25px rgba(255, 140, 0, 0.3)'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 12px 30px rgba(255, 140, 0, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 8px 25px rgba(255, 140, 0, 0.3)';
                }}
              >
                Enviar Mensagem
              </button>
            </form>
          </div>
          
          {/* Informações de Contato */}
          <div>
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              padding: '3rem',
              borderRadius: '20px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
              border: '1px solid rgba(255, 140, 0, 0.2)',
              marginBottom: '2rem'
            }}>
              <h2 style={{
                color: '#2C1810',
                fontSize: '1.8rem',
                fontWeight: '600',
                marginBottom: '2rem'
              }}>
                Informações de Contato
              </h2>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem'
                }}>
                  <span style={{ 
                    color: '#FF8C00', 
                    fontSize: '1.5rem',
                    minWidth: '30px',
                    textAlign: 'center'
                  }}>📍</span>
                  <div>
                    <h3 style={{ 
                      color: '#4A2C1A', 
                      margin: '0 0 0.5rem 0',
                      fontWeight: '600'
                    }}>
                      Endereço
                    </h3>
                    <p style={{ 
                      color: '#6B4423', 
                      margin: '0',
                      lineHeight: '1.6'
                    }}>
                      Rua das Escolas, 123<br/>
                      Bairro Centro<br/>
                      Cidade - UF<br/>
                      CEP: 12.345-678
                    </p>
                  </div>
                </div>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem'
                }}>
                  <span style={{ 
                    color: '#FF8C00', 
                    fontSize: '1.5rem',
                    minWidth: '30px',
                    textAlign: 'center'
                  }}>📞</span>
                  <div>
                    <h3 style={{ 
                      color: '#4A2C1A', 
                      margin: '0 0 0.5rem 0',
                      fontWeight: '600'
                    }}>
                      Telefones
                    </h3>
                    <p style={{ 
                      color: '#6B4423', 
                      margin: '0',
                      lineHeight: '1.6'
                    }}>
                      (00) 1234-5678<br/>
                      (00) 98765-4321 (WhatsApp)
                    </p>
                  </div>
                </div>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem'
                }}>
                  <span style={{ 
                    color: '#FF8C00', 
                    fontSize: '1.5rem',
                    minWidth: '30px',
                    textAlign: 'center'
                  }}>📧</span>
                  <div>
                    <h3 style={{ 
                      color: '#4A2C1A', 
                      margin: '0 0 0.5rem 0',
                      fontWeight: '600'
                    }}>
                      E-mails
                    </h3>
                    <p style={{ 
                      color: '#6B4423', 
                      margin: '0',
                      lineHeight: '1.6'
                    }}>
                      contato@colegiomaraelu.com.br<br/>
                      secretaria@colegiomaraelu.com.br
                    </p>
                  </div>
                </div>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem'
                }}>
                  <span style={{ 
                    color: '#FF8C00', 
                    fontSize: '1.5rem',
                    minWidth: '30px',
                    textAlign: 'center'
                  }}>🕐</span>
                  <div>
                    <h3 style={{ 
                      color: '#4A2C1A', 
                      margin: '0 0 0.5rem 0',
                      fontWeight: '600'
                    }}>
                      Horário de Funcionamento
                    </h3>
                    <p style={{ 
                      color: '#6B4423', 
                      margin: '0',
                      lineHeight: '1.6'
                    }}>
                      Segunda a Sexta: 7h30 às 17h30<br/>
                      Sábado: 8h às 12h<br/>
                      Domingo: Fechado
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Mapa Placeholder */}
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              padding: '2rem',
              borderRadius: '20px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
              border: '1px solid rgba(255, 140, 0, 0.2)',
              textAlign: 'center'
            }}>
              <h3 style={{
                color: '#2C1810',
                fontSize: '1.3rem',
                fontWeight: '600',
                marginBottom: '1rem'
              }}>
                Localização
              </h3>
              <div style={{
                backgroundColor: 'linear-gradient(135deg, #F5E6D3 0%, #FFF8F0 100%)',
                height: '200px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px dashed rgba(255, 140, 0, 0.3)'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🗺️</div>
                  <p style={{ 
                    color: '#6B4423', 
                    margin: '0',
                    fontSize: '0.95rem'
                  }}>
                    Mapa interativo<br/>
                    em desenvolvimento
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContatoPage;
