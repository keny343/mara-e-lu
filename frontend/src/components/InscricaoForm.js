import React, { useState } from 'react';
import axios from 'axios';

function InscricaoForm() {
  const [formData, setFormData] = useState({
    nome: '',
    dataNascimento: '',
    biNumero: '',
    nifNumero: '',
    naturalidade: '',
    nomePai: '',
    nomeMae: '',
    email: '',
    telefone: '',
    endereco: '',
    serie: '',
    fotoBi: null,
    fotoBiUrl: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validar tipo e tamanho
      if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/jpg') {
        alert('Por favor, envie uma imagem (JPG ou PNG)');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) { // 5MB
        alert('A imagem deve ter no máximo 5MB');
        return;
      }

      // Criar preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          fotoBi: file,
          fotoBiUrl: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeFoto = () => {
    setFormData({
      ...formData,
      fotoBi: null,
      fotoBiUrl: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensagem('');

    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'https://mara-e-lu-backend.up.railway.app';
      await axios.post(`${apiUrl}/api/alunos`, formData);
      
      setMensagem('Inscrição realizada com sucesso! Entraremos em contato em breve.');
      setFormData({
        nome: '',
        dataNascimento: '',
        biNumero: '',
        nifNumero: '',
        naturalidade: '',
        nomePai: '',
        nomeMae: '',
        email: '',
        telefone: '',
        endereco: '',
        serie: '',
        fotoBi: null,
        fotoBiUrl: ''
      });
    } catch (error) {
      setMensagem('Erro ao realizar inscrição. Tente novamente mais tarde.');
      console.error('Erro:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '3rem',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderRadius: '20px',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
      border: '1px solid rgba(255, 140, 0, 0.2)',
      position: 'relative'
    }}>
      {/* Cabeçalho do formulário */}
      <div style={{
        textAlign: 'center',
        marginBottom: '3rem',
        paddingBottom: '2rem',
        borderBottom: '2px solid rgba(255, 140, 0, 0.1)'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          background: 'linear-gradient(135deg, #FF8C00 0%, #FF6B35 100%)',
          borderRadius: '16px',
          margin: '0 auto 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2rem',
          color: 'white',
          fontWeight: 'bold',
          boxShadow: '0 8px 25px rgba(255, 140, 0, 0.3)',
          transform: 'rotate(-3deg)'
        }}>
          📝
        </div>
        <h2 style={{
          color: '#2C1810',
          fontSize: '2rem',
          fontWeight: '300',
          marginBottom: '0.5rem',
          letterSpacing: '-0.5px'
        }}>
          Formulário de Inscrição
        </h2>
        <p style={{
          color: '#6B4423',
          fontSize: '1.1rem',
          margin: '0',
          fontWeight: '400'
        }}>
          Preencha os dados abaixo para iniciar o processo de matrícula
        </p>
      </div>

      {mensagem && (
        <div style={{
          padding: '1.25rem',
          marginBottom: '2rem',
          borderRadius: '12px',
          textAlign: 'center',
          backgroundColor: mensagem.includes('sucesso') 
            ? 'linear-gradient(135deg, #D4EDDA 0%, #C3E6CB 100%)' 
            : 'linear-gradient(135deg, #F8D7DA 0%, #F5C6CB 100%)',
          color: mensagem.includes('sucesso') ? '#155724' : '#721C24',
          border: `1px solid ${mensagem.includes('sucesso') ? '#C3E6CB' : '#F5C6CB'}`,
          fontSize: '1rem',
          fontWeight: '500',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
        }}>
          {mensagem}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '3rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '2rem',
            paddingBottom: '1rem',
            borderBottom: '1px solid rgba(107, 68, 35, 0.1)'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #4A2C1A 0%, #2C1810 100%)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '1.2rem'
            }}>
              👤
            </div>
            <h3 style={{ 
              color: '#2C1810', 
              fontSize: '1.5rem',
              fontWeight: '500',
              margin: '0'
            }}>
              Dados do Aluno
            </h3>
          </div>
          
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
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
              placeholder="Digite o nome completo do aluno"
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

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ 
                display: 'block', 
                color: '#4A2C1A', 
                marginBottom: '0.75rem', 
                fontWeight: '600',
                fontSize: '0.95rem'
              }}>
                Data de Nascimento *
              </label>
              <input
                type="date"
                name="dataNascimento"
                value={formData.dataNascimento}
                onChange={handleChange}
                required
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

            <div>
              <label style={{ 
                display: 'block', 
                color: '#4A2C1A', 
                marginBottom: '0.75rem', 
                fontWeight: '600',
                fontSize: '0.95rem'
              }}>
                Série *
              </label>
              <select
                name="serie"
                value={formData.serie}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '1rem 1.25rem',
                  border: '2px solid rgba(107, 68, 35, 0.2)',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  fontFamily: 'inherit',
                  cursor: 'pointer'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#FF8C00';
                  e.target.style.boxShadow = '0 0 0 3px rgba(255, 140, 0, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(107, 68, 35, 0.2)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <option value="">Selecione a série...</option>
                <option value="1-ano">1º Ano - Ensino Fundamental I</option>
                <option value="2-ano">2º Ano - Ensino Fundamental I</option>
                <option value="3-ano">3º Ano - Ensino Fundamental I</option>
                <option value="4-ano">4º Ano - Ensino Fundamental I</option>
                <option value="5-ano">5º Ano - Ensino Fundamental I</option>
                <option value="6-ano">6º Ano - Ensino Fundamental II</option>
                <option value="7-ano">7º Ano - Ensino Fundamental II</option>
                <option value="8-ano">8º Ano - Ensino Fundamental II</option>
                <option value="9-ano">9º Ano - Ensino Fundamental II</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ 
                display: 'block', 
                color: '#4A2C1A', 
                marginBottom: '0.75rem', 
                fontWeight: '600',
                fontSize: '0.95rem'
              }}>
                Nº do Bilhete de Identidade *
              </label>
              <input
                type="text"
                name="biNumero"
                value={formData.biNumero}
                onChange={handleChange}
                required
                placeholder="000000000LA0XX"
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

            <div>
              <label style={{ 
                display: 'block', 
                color: '#4A2C1A', 
                marginBottom: '0.75rem', 
                fontWeight: '600',
                fontSize: '0.95rem'
              }}>
                NIF (Número de Identificação Fiscal)
              </label>
              <input
                type="text"
                name="nifNumero"
                value={formData.nifNumero}
                onChange={handleChange}
                placeholder="000000000LA0XX"
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
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ 
              display: 'block', 
              color: '#4A2C1A', 
              marginBottom: '0.75rem', 
              fontWeight: '600',
              fontSize: '0.95rem'
            }}>
              Naturalidade *
            </label>
            <input
              type="text"
              name="naturalidade"
              value={formData.naturalidade}
              onChange={handleChange}
              required
              placeholder="Ex: Luanda, Cazenga, etc."
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

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ 
                display: 'block', 
                color: '#4A2C1A', 
                marginBottom: '0.75rem', 
                fontWeight: '600',
                fontSize: '0.95rem'
              }}>
                Nome do Pai *
              </label>
              <input
                type="text"
                name="nomePai"
                value={formData.nomePai}
                onChange={handleChange}
                required
                placeholder="Digite o nome completo do pai"
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

            <div>
              <label style={{ 
                display: 'block', 
                color: '#4A2C1A', 
                marginBottom: '0.75rem', 
                fontWeight: '600',
                fontSize: '0.95rem'
              }}>
                Nome da Mãe *
              </label>
              <input
                type="text"
                name="nomeMae"
                value={formData.nomeMae}
                onChange={handleChange}
                required
                placeholder="Digite o nome completo da mãe"
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
          </div>
        </div>

        <div style={{ marginBottom: '3rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '2rem',
            paddingBottom: '1rem',
            borderBottom: '1px solid rgba(107, 68, 35, 0.1)'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #4A2C1A 0%, #2C1810 100%)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '1.2rem'
            }}>
              �
            </div>
            <h3 style={{ 
              color: '#2C1810', 
              fontSize: '1.5rem',
              fontWeight: '500',
              margin: '0'
            }}>
              Documento de Identificação
            </h3>
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ 
              display: 'block', 
              color: '#4A2C1A', 
              marginBottom: '0.75rem', 
              fontWeight: '600',
              fontSize: '0.95rem'
            }}>
              Foto do Bilhete de Identidade *
            </label>
            <div style={{
              border: '2px dashed rgba(255, 140, 0, 0.3)',
              borderRadius: '12px',
              padding: '2rem',
              textAlign: 'center',
              backgroundColor: 'rgba(255, 140, 0, 0.05)',
              transition: 'all 0.3s ease'
            }}>
              {formData.fotoBiUrl ? (
                <div>
                  <img 
                    src={formData.fotoBiUrl} 
                    alt="Preview do BI" 
                    style={{
                      maxWidth: '300px',
                      maxHeight: '200px',
                      borderRadius: '8px',
                      marginBottom: '1rem',
                      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <button
                      type="button"
                      onClick={removeFoto}
                      style={{
                        background: 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)',
                        color: 'white',
                        border: 'none',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '8px',
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        fontWeight: '600',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 4px 15px rgba(220, 53, 69, 0.3)';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      Remover Foto
                    </button>
                    <label
                      style={{
                        background: 'linear-gradient(135deg, #FF8C00 0%, #FF6B35 100%)',
                        color: 'white',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '8px',
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        fontWeight: '600',
                        transition: 'all 0.3s ease',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 4px 15px rgba(255, 140, 0, 0.3)';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      <span>🔄</span>
                      Trocar Foto
                    </label>
                    <input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png"
                      onChange={handleFileUpload}
                      style={{ display: 'none' }}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{
                    fontSize: '3rem',
                    marginBottom: '1rem',
                    color: '#FF8C00'
                  }}>
                    📄
                  </div>
                  <p style={{
                    color: '#6B4423',
                    fontSize: '1rem',
                    marginBottom: '1.5rem',
                    margin: '0 0 1.5rem 0'
                  }}>
                    Arraste a foto do BI aqui ou clique para selecionar
                  </p>
                  <label
                    style={{
                      background: 'linear-gradient(135deg, #FF8C00 0%, #FF6B35 100%)',
                      color: 'white',
                      padding: '1rem 2rem',
                      borderRadius: '10px',
                      fontSize: '1rem',
                      cursor: 'pointer',
                      fontWeight: '600',
                      transition: 'all 0.3s ease',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      boxShadow: '0 4px 15px rgba(255, 140, 0, 0.3)'
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
                    <span>📤</span>
                    Escolher Arquivo
                  </label>
                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png"
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                  />
                  <p style={{
                    color: '#6B4423',
                    fontSize: '0.85rem',
                    marginTop: '1rem',
                    margin: '1rem 0 0 0'
                  }}>
                    Formatos aceitos: JPG, PNG. Tamanho máximo: 5MB
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '3rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '2rem',
            paddingBottom: '1rem',
            borderBottom: '1px solid rgba(107, 68, 35, 0.1)'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #4A2C1A 0%, #2C1810 100%)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '1.2rem'
            }}>
              📞
            </div>
            <h3 style={{ 
              color: '#2C1810', 
              fontSize: '1.5rem',
              fontWeight: '500',
              margin: '0'
            }}>
              Contato e Endereço
            </h3>
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ 
              display: 'block', 
              color: '#4A2C1A', 
              marginBottom: '0.75rem', 
              fontWeight: '600',
              fontSize: '0.95rem'
            }}>
              Nome do Responsável *
            </label>
            <input
              type="text"
              name="nomeResponsavel"
              value={formData.nomeResponsavel}
              onChange={handleChange}
              required
              placeholder="Digite o nome completo do responsável"
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

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ 
                display: 'block', 
                color: '#4A2C1A', 
                marginBottom: '0.75rem', 
                fontWeight: '600',
                fontSize: '0.95rem'
              }}>
                CPF do Responsável *
              </label>
              <input
                type="text"
                name="cpfResponsavel"
                value={formData.cpfResponsavel}
                onChange={handleChange}
                required
                placeholder="000.000.000-00"
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

            <div>
              <label style={{ 
                display: 'block', 
                color: '#4A2C1A', 
                marginBottom: '0.75rem', 
                fontWeight: '600',
                fontSize: '0.95rem'
              }}>
                Telefone *
              </label>
              <input
                type="tel"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                required
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
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="responsavel@exemplo.com"
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
              Endereço Completo *
            </label>
            <input
              type="text"
              name="endereco"
              value={formData.endereco}
              onChange={handleChange}
              required
              placeholder="Rua, número, bairro, cidade - UF"
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
        </div>

        <div style={{
          textAlign: 'center',
          paddingTop: '2rem',
          borderTop: '2px solid rgba(255, 140, 0, 0.1)'
        }}>
          <button
            type="submit"
            disabled={loading}
            style={{
              background: loading 
                ? 'linear-gradient(135deg, #6B4423 0%, #4A2C1A 100%)' 
                : 'linear-gradient(135deg, #FF8C00 0%, #FF6B35 100%)',
              color: 'white',
              border: 'none',
              padding: '1.25rem 3rem',
              borderRadius: '15px',
              fontSize: '1.1rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              boxShadow: loading 
                ? '0 4px 15px rgba(107, 68, 35, 0.3)' 
                : '0 8px 25px rgba(255, 140, 0, 0.4)',
              transform: loading ? 'none' : 'translateY(0)',
              minWidth: '250px'
            }}
            onMouseOver={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 12px 30px rgba(255, 140, 0, 0.5)';
              }
            }}
            onMouseOut={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 25px rgba(255, 140, 0, 0.4)';
              }
            }}
          >
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  borderTop: '2px solid white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
                Processando inscrição...
              </span>
            ) : (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                <span>📋</span> Enviar Inscrição
              </span>
            )}
          </button>
          
          <p style={{
            color: '#6B4423',
            fontSize: '0.9rem',
            marginTop: '1rem',
            margin: '1rem 0 0 0'
          }}>
            Após o envio, entraremos em contato em até 48 horas úteis.
          </p>
        </div>
      </form>
      
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default InscricaoForm;
