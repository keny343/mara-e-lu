import React from 'react';

function CursosPage() {
  const cursos = [
    {
      nome: "Ensino Fundamental I",
      series: ["1º Ano", "2º Ano", "3º Ano", "4º Ano", "5º Ano"],
      idade: "6 a 10 anos",
      descricao: "Fase fundamental da alfabetização e desenvolvimento cognitivo",
      icon: "📚"
    },
    {
      nome: "Ensino Fundamental II",
      series: ["6º Ano", "7º Ano", "8º Ano", "9º Ano"],
      idade: "11 a 14 anos",
      descricao: "Aprofundamento dos conhecimentos e preparação para o Ensino Médio",
      icon: "🎯"
    }
  ];

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
            Cursos Oferecidos
          </h1>
          <p style={{
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '1.2rem',
            margin: '0'
          }}>
            Conheça nossa estrutura educacional completa
          </p>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '2rem'
        }}>
          {cursos.map((curso, index) => (
            <div key={index} style={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              padding: '3rem',
              borderRadius: '20px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
              border: '1px solid rgba(255, 140, 0, 0.2)',
              transition: 'all 0.3s ease'
            }}>
              <div style={{
                textAlign: 'center',
                marginBottom: '2rem'
              }}>
                <div style={{
                  fontSize: '4rem',
                  marginBottom: '1rem'
                }}>
                  {curso.icon}
                </div>
                <h2 style={{
                  color: '#2C1810',
                  fontSize: '1.8rem',
                  fontWeight: '600',
                  margin: '0 0 0.5rem 0'
                }}>
                  {curso.nome}
                </h2>
                <p style={{
                  color: '#6B4423',
                  fontSize: '1rem',
                  margin: '0'
                }}>
                  {curso.idade}
                </p>
              </div>
              
              <div style={{
                backgroundColor: 'linear-gradient(135deg, #FFF8F0 0%, #F5E6D3 100%)',
                padding: '1.5rem',
                borderRadius: '12px',
                marginBottom: '1.5rem'
              }}>
                <h3 style={{
                  color: '#4A2C1A',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  margin: '0 0 1rem 0'
                }}>
                  Séries Oferecidas:
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                  gap: '0.75rem'
                }}>
                  {curso.series.map((serie, idx) => (
                    <div key={idx} style={{
                      backgroundColor: 'white',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      textAlign: 'center',
                      border: '1px solid rgba(255, 140, 0, 0.2)'
                    }}>
                      <span style={{
                        color: '#FF8C00',
                        fontWeight: '600',
                        fontSize: '0.9rem'
                      }}>
                        {serie}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <p style={{
                color: '#6B4423',
                fontSize: '1rem',
                lineHeight: '1.6',
                margin: '0'
              }}>
                {curso.descricao}
              </p>
              
              <button style={{
                width: '100%',
                background: 'linear-gradient(135deg, #FF8C00 0%, #FF6B35 100%)',
                color: 'white',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                marginTop: '2rem',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(255, 140, 0, 0.3)'
              }}>
                Saiba Mais →
              </button>
            </div>
          ))}
        </div>
        
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          padding: '3rem',
          borderRadius: '20px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(255, 140, 0, 0.2)',
          marginTop: '3rem'
        }}>
          <h2 style={{
            color: '#2C1810',
            fontSize: '2rem',
            fontWeight: '600',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            Diferenciais do Colégio Mara e Lu
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '3rem',
                marginBottom: '1rem'
              }}>👩‍🏫</div>
              <h3 style={{ color: '#4A2C1A', margin: '0 0 0.5rem 0' }}>Professores Qualificados</h3>
              <p style={{ color: '#6B4433', margin: '0', fontSize: '0.95rem' }}>
                Equipe pedagógica especializada e atualizada
              </p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '3rem',
                marginBottom: '1rem'
              }}>💻</div>
              <h3 style={{ color: '#4A2C1A', margin: '0 0 0.5rem 0' }}>Laboratórios Modernos</h3>
              <p style={{ color: '#6B4433', margin: '0', fontSize: '0.95rem' }}>
                Infraestrutura tecnológica de ponta
              </p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '3rem',
                marginBottom: '1rem'
              }}>🏃‍♂️</div>
              <h3 style={{ color: '#4A2C1A', margin: '0 0 0.5rem 0' }}>Atividades Esportivas</h3>
              <p style={{ color: '#6B4433', margin: '0', fontSize: '0.95rem' }}>
                Desenvolvimento físico e social completo
              </p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '3rem',
                marginBottom: '1rem'
              }}>🎨</div>
              <h3 style={{ color: '#4A2C1A', margin: '0 0 0.5rem 0' }}>Artes e Cultura</h3>
              <p style={{ color: '#6B4433', margin: '0', fontSize: '0.95rem' }}>
                Estímulo à criatividade e expressão cultural
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CursosPage;
