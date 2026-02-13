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
            Sobre o Colégio Mara e Lú
          </h1>
          
          <div style={{
            textAlign: 'center',
            marginBottom: '3rem'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: 'linear-gradient(135deg, #FFF8F0 0%, #F5E6D3 100%)',
              padding: '0.75rem 1.5rem',
              borderRadius: '25px',
              border: '1px solid rgba(255, 140, 0, 0.2)',
              marginBottom: '1rem'
            }}>
              <span style={{ fontSize: '1.2rem' }}>📍</span>
              <span style={{ color: '#4A2C1A', fontWeight: '500' }}>
                Bairro Cassenda, Rua 15 - Maianga, Luanda
              </span>
            </div>
            <p style={{
              color: '#6B4423',
              fontSize: '1rem',
              fontStyle: 'italic',
              margin: '0'
            }}>
              Desde março de 2008 educando com excelência
            </p>
          </div>
          
          <div style={{
            backgroundColor: 'linear-gradient(135deg, #FFF8F0 0%, #F5E6D3 100%)',
            padding: '2.5rem',
            borderRadius: '15px',
            marginBottom: '3rem',
            border: '1px solid rgba(255, 140, 0, 0.2)'
          }}>
            <h2 style={{
              color: '#2C1810',
              fontSize: '1.8rem',
              marginBottom: '1.5rem',
              fontWeight: '600',
              textAlign: 'center'
            }}>
              Nossa História
            </h2>
            <p style={{
              color: '#6B4423',
              fontSize: '1.1rem',
              lineHeight: '1.8',
              margin: '0',
              textAlign: 'justify'
            }}>
              O Colégio Mara e Lú foi fundado no mês de março de 2008, fruto de um sonho transformado em realidade. 
              Localizado no coração do bairro Cassenda, na rua 15, no distrito urbano da Maianga, em Luanda, 
              o colégio nasceu com a missão de oferecer uma educação de qualidade, baseada em valores éticos, 
              respeito e compromisso com o futuro das crianças e jovens da comunidade.
            </p>
            <br />
            <p style={{
              color: '#6B4423',
              fontSize: '1.1rem',
              lineHeight: '1.8',
              margin: '0',
              textAlign: 'justify'
            }}>
              Desde a sua criação, o Colégio Mara e Lú tem se destacado pelo ambiente acolhedor, pela dedicação dos 
              seus professores e pela busca constante pela excelência no ensino. Iniciando com turmas pequenas e 
              estrutura modesta, o colégio foi crescendo graças à confiança das famílias e ao empenho da sua direção 
              em promover uma formação sólida e integral.
            </p>
            <br />
            <p style={{
              color: '#6B4423',
              fontSize: '1.1rem',
              lineHeight: '1.8',
              margin: '0',
              textAlign: 'justify'
            }}>
              Ao longo dos anos, o colégio tem investido em infraestrutura, tecnologia e capacitação docente, 
              acompanhando as mudanças e necessidades da educação contemporânea. Hoje, é reconhecido como uma 
              instituição respeitada e comprometida com o desenvolvimento académico e humano dos seus alunos.
            </p>
            <br />
            <p style={{
              color: '#6B4423',
              fontSize: '1.1rem',
              lineHeight: '1.8',
              margin: '0',
              textAlign: 'justify',
              fontStyle: 'italic'
            }}>
              A história do Colégio Mara e Lú é marcada por esforço, paixão pela educação e um profundo compromisso 
              com a comunidade do Cassenda. E continua a ser escrita, todos os dias, com cada conquista dos seus 
              estudantes e com cada passo rumo a um futuro promissor.
            </p>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              padding: '2rem',
              borderRadius: '15px',
              border: '1px solid rgba(255, 140, 0, 0.2)',
              textAlign: 'center'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #FF8C00 0%, #FF6B35 100%)',
                borderRadius: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.8rem',
                margin: '0 auto 1.5rem',
                color: 'white'
              }}>
                🎯
              </div>
              <h3 style={{
                color: '#2C1810',
                fontSize: '1.5rem',
                marginBottom: '1rem',
                fontWeight: '600'
              }}>
                Missão
              </h3>
              <p style={{
                color: '#6B4423',
                fontSize: '1rem',
                lineHeight: '1.6',
                margin: '0'
              }}>
                Formar integralmente jovens de modo a prepará-los para participarem de forma ativa e plena na sociedade.
              </p>
            </div>
            
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              padding: '2rem',
              borderRadius: '15px',
              border: '1px solid rgba(255, 140, 0, 0.2)',
              textAlign: 'center'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #FF8C00 0%, #FF6B35 100%)',
                borderRadius: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.8rem',
                margin: '0 auto 1.5rem',
                color: 'white'
              }}>
                👁️
              </div>
              <h3 style={{
                color: '#2C1810',
                fontSize: '1.5rem',
                marginBottom: '1rem',
                fontWeight: '600'
              }}>
                Visão
              </h3>
              <p style={{
                color: '#6B4423',
                fontSize: '1rem',
                lineHeight: '1.6',
                margin: '0'
              }}>
                Ser uma instituição de referência nacional que prima pela qualidade de ensino para os alunos.
              </p>
            </div>
          </div>
          
          <div style={{
            backgroundColor: 'linear-gradient(135deg, #FFF8F0 0%, #F5E6D3 100%)',
            padding: '2.5rem',
            borderRadius: '15px',
            border: '1px solid rgba(255, 140, 0, 0.2)'
          }}>
            <h3 style={{
              color: '#2C1810',
              fontSize: '1.5rem',
              marginBottom: '2rem',
              fontWeight: '600',
              textAlign: 'center'
            }}>
              Nossos Valores
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1.5rem'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '2.5rem',
                  marginBottom: '0.5rem'
                }}>🤝</div>
                <h4 style={{ color: '#4A2C1A', margin: '0 0 0.5rem 0', fontWeight: '600' }}>Humildade</h4>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '2.5rem',
                  marginBottom: '0.5rem'
                }}>🙏</div>
                <h4 style={{ color: '#4A2C1A', margin: '0 0 0.5rem 0', fontWeight: '600' }}>Respeito</h4>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '2.5rem',
                  marginBottom: '0.5rem'
                }}>⚖️</div>
                <h4 style={{ color: '#4A2C1A', margin: '0 0 0.5rem 0', fontWeight: '600' }}>Responsabilidade</h4>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '2.5rem',
                  marginBottom: '0.5rem'
                }}>🎯</div>
                <h4 style={{ color: '#4A2C1A', margin: '0 0 0.5rem 0', fontWeight: '600' }}>Rigor</h4>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '2.5rem',
                  marginBottom: '0.5rem'
                }}>🤗</div>
                <h4 style={{ color: '#4A2C1A', margin: '0 0 0.5rem 0', fontWeight: '600' }}>Harmonia</h4>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '2.5rem',
                  marginBottom: '0.5rem'
                }}>❤️</div>
                <h4 style={{ color: '#4A2C1A', margin: '0 0 0.5rem 0', fontWeight: '600' }}>Solidariedade</h4>
              </div>
            </div>
          </div>
          
          <div style={{
            marginTop: '3rem',
            textAlign: 'center',
            padding: '2rem',
            backgroundColor: 'rgba(255, 140, 0, 0.1)',
            borderRadius: '15px',
            border: '1px solid rgba(255, 140, 0, 0.2)'
          }}>
            <h3 style={{
              color: '#2C1810',
              fontSize: '1.3rem',
              marginBottom: '1.5rem',
              fontWeight: '600'
            }}>
              Entre em Contato
            </h3>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '2rem',
              flexWrap: 'wrap'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span style={{ color: '#FF8C00', fontSize: '1.2rem' }}>📱</span>
                <span style={{ color: '#4A2C1A', fontWeight: '500' }}>+244 946 340 172</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span style={{ color: '#FF8C00', fontSize: '1.2rem' }}>📞</span>
                <span style={{ color: '#4A2C1A', fontWeight: '500' }}>+244 923 537 738</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SobrePage;
