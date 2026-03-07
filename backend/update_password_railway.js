const bcrypt = require('bcryptjs');

// Simular atualização para Railway
async function generateHash() {
  try {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    console.log('Hash gerado:');
    console.log(hashedPassword);
    console.log('');
    console.log('SQL para atualizar:');
    console.log(`UPDATE usuarios SET senha = '${hashedPassword}' WHERE email = 'admin@maraelu.co.ao';`);
  } catch (error) {
    console.error('Erro:', error);
  }
}

generateHash();
