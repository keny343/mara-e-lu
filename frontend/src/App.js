import React from 'react';
import axios from 'axios';

function App() {
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
      backgroundColor: '#f5f5f5'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        <h1 style={{ color: '#333', marginBottom: '1rem' }}>
          Sistema de Inscrições e Matrículas
        </h1>
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <p style={{ color: '#666' }}>
            Status do Backend: <strong>{message}</strong>
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
