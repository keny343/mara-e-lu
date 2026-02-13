import React from 'react';

function SobrePage() {
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
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          padding: '4rem',
          borderRadius: '20px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(255, 140, 0, 0.2)'
        }}>
          <h1 style={{
            color: '#2C1810',
            fontSize: '2.5rem',
            fontWeight: '300',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            Sobre o Colégio Mara e Lu
          </h1>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '3rem',
            marginTop: '3rem'
          }}>
            <div>
              <h2 style={{
                color: '#FF8C00',
                fontSize: '1.8rem',
                marginBottom: '1.5rem',
                fontWeight: '600'
              }}>
                Nossa História
              </h2>
              <p style={{
                color: '#6B4423',
                fontSize: '1.1rem',
                lineHeight: '1.8',
                margin: '0'
              }}>
                Fundado em 2003, o Colégio Mara e Lu nasceu do sonho de proporcionar 
                uma educação de qualidade que forme cidadãos conscientes, críticos 
                e preparados para os desafios do futuro.
              </p>
            </div>
            
            <div>
              <h2 style={{
                color: '#FF8C00',
                fontSize: '1.8rem',
                marginBottom: '1.5rem',
                fontWeight: '600'
              }}>
                Nossa Missão
              </h2>
              <p style={{
                color: '#6B4423',
                fontSize: '1.1rem',
                lineHeight: '1.8',
                margin: '0'
              }}>
                Promover uma educação transformadora que desenvolva o potencial 
                integral de cada aluno, combinando excelência acadêmica com 
                valores humanos e responsabilidade social.
              </p>
            </div>
          </div>
          
          <div style={{
            marginTop: '3rem',
            padding: '2rem',
            backgroundColor: 'linear-gradient(135deg, #FFF8F0 0%, #F5E6D3 100%)',
            borderRadius: '15px',
            border: '1px solid rgba(255, 140, 0, 0.2)'
          }}>
            <h3 style={{
              color: '#2C1810',
              fontSize: '1.5rem',
              marginBottom: '1rem',
              fontWeight: '600'
            }}>
              Nossos Valores
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.5rem'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '2.5rem',
                  marginBottom: '0.5rem'
                }}>🎓</div>
                <h4 style={{ color: '#4A2C1A', margin: '0 0 0.5rem 0' }}>Excelência</h4>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '2.5rem',
                  marginBottom: '0.5rem'
                }}>❤️</div>
                <h4 style={{ color: '#4A2C1A', margin: '0 0 0.5rem 0' }}>Amor</h4>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '2.5rem',
                  marginBottom: '0.5rem'
                }}>🤝</div>
                <h4 style={{ color: '#4A2C1A', margin: '0 0 0.5rem 0' }}>Respeito</h4>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '2.5rem',
                  marginBottom: '0.5rem'
                }}>🌱</div>
                <h4 style={{ color: '#4A2C1A', margin: '0 0 0.5rem 0' }}>Crescimento</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SobrePage;
