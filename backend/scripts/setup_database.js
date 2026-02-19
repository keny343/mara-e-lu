const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config();

function getDatabaseConfigFromUrl(url) {
  if (!url) return null;
  const parsed = new URL(url);
  const user = decodeURIComponent(parsed.username || '');
  const password = decodeURIComponent(parsed.password || '');
  const database = (parsed.pathname || '').replace(/^\//, '');
  return {
    host: parsed.hostname,
    user,
    password,
    database,
    port: parsed.port ? Number(parsed.port) : 3306
  };
}

function getConnectionConfig() {
  const urlConfig = getDatabaseConfigFromUrl(process.env.MYSQL_URL || process.env.DATABASE_URL);

  return {
    host: (urlConfig && urlConfig.host) || process.env.MYSQLHOST || process.env.DB_HOST,
    user: (urlConfig && urlConfig.user) || process.env.MYSQLUSER || process.env.DB_USER,
    password: (urlConfig && urlConfig.password) || process.env.MYSQLPASSWORD || process.env.DB_PASSWORD,
    database: (urlConfig && urlConfig.database) || process.env.MYSQLDATABASE || process.env.DB_NAME,
    port: (urlConfig && urlConfig.port) || Number(process.env.MYSQLPORT || process.env.DB_PORT || 3306),
    multipleStatements: true
  };
}

function loadSqlFile() {
  const fileFromEnv = process.env.DB_SETUP_FILE;
  const defaultFile = path.resolve(__dirname, '..', 'database.sql');
  const fallbackFile = path.resolve(__dirname, '..', '..', 'database', 'schema.sql');

  const candidates = [fileFromEnv, defaultFile, fallbackFile].filter(Boolean);

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return {
        filePath: candidate,
        content: fs.readFileSync(candidate, 'utf8')
      };
    }
  }

  throw new Error('Nenhum arquivo SQL encontrado. Defina DB_SETUP_FILE ou verifique backend/database.sql');
}

function normalizeSql(sql) {
  // MySQL "DELIMITER" is a client-side command. We'll stop execution before it.
  const delimiterIndex = sql.toUpperCase().indexOf('DELIMITER ');
  if (delimiterIndex >= 0) {
    sql = sql.slice(0, delimiterIndex);
  }

  // Remove BOM
  sql = sql.replace(/^\uFEFF/, '');

  return sql;
}

function splitStatements(sql) {
  // Very simple splitter (works for most CREATE/INSERT/ALTER statements without stored programs)
  // Since we cut everything after DELIMITER, we won't have triggers/procedures here.
  return sql
    .split(/;\s*\n|;\s*$/gm)
    .map(s => s.trim())
    .filter(Boolean)
    .filter(s => !s.startsWith('--'));
}

async function main() {
  const { filePath, content } = loadSqlFile();
  const sql = normalizeSql(content);
  const statements = splitStatements(sql);

  if (statements.length === 0) {
    throw new Error(`Arquivo SQL sem comandos executveis: ${filePath}`);
  }

  const config = getConnectionConfig();

  if (!config.host || !config.user || !config.database) {
    throw new Error('Config do banco incompleta. Configure DATABASE_URL (ou MYSQLHOST/MYSQLUSER/MYSQLPASSWORD/MYSQLDATABASE).');
  }

  console.log('== Setup Database ==');
  console.log('Arquivo:', filePath);
  console.log('Host:', config.host);
  console.log('Port:', config.port);
  console.log('Database:', config.database);
  console.log('Statements:', statements.length);

  const connection = await mysql.createConnection(config);

  try {
    for (let i = 0; i < statements.length; i++) {
      const stmt = statements[i];
      try {
        await connection.query(stmt);
      } catch (err) {
        console.error(`Erro no statement #${i + 1}:`);
        console.error(stmt);
        throw err;
      }
    }

    console.log('Setup concluido com sucesso.');

    if (content.toUpperCase().includes('DELIMITER ')) {
      console.log('Observao: o arquivo tinha comandos com DELIMITER (triggers/procedures).');
      console.log('Essas partes foram ignoradas pelo script e devem ser executadas manualmente via um cliente MySQL que suporte DELIMITER (ex: DBeaver/Workbench).');
    }
  } finally {
    await connection.end();
  }
}

main().catch((err) => {
  console.error('Falha no setup do banco:', err.message);
  process.exit(1);
});
