const bcrypt = require('bcryptjs');
const db = require('./config/database');

async function updatePassword() {
  try {
    // Hash da senha
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    // Atualizar senha do usuário admin
    const result = await db.query(
      'UPDATE usuarios SET senha = ? WHERE email = ?',
      [hashedPassword, 'admin@maraelu.co.ao']
    );
    
    console.log('Senha atualizada:', result);
    console.log('Senha hash:', hashedPassword);
    
    process.exit(0);
  } catch (error) {
    console.error('Erro:', error);
    process.exit(1);
  }
}

updatePassword();
