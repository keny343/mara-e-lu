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

const urlConfig = getDatabaseConfigFromUrl(process.env.MYSQL_URL || process.env.DATABASE_URL);

const dbConfig = {
  host: (urlConfig && urlConfig.host) || process.env.MYSQLHOST || process.env.DB_HOST,
  user: (urlConfig && urlConfig.user) || process.env.MYSQLUSER || process.env.DB_USER,
  password: (urlConfig && urlConfig.password) || process.env.MYSQLPASSWORD || process.env.DB_PASSWORD,
  database: (urlConfig && urlConfig.database) || process.env.MYSQLDATABASE || process.env.DB_NAME,
  port: (urlConfig && urlConfig.port) || process.env.MYSQLPORT || process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

module.exports = {
  async query(sql, params) {
    try {
      const [rows] = await pool.execute(sql, params);
      return rows;
    } catch (error) {
      console.error('Erro na consulta SQL:', error);
      throw error;
    }
  },

  async transaction(callback) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();
      const result = await callback(connection);
      await connection.commit();
      return result;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  },

  pool
};
