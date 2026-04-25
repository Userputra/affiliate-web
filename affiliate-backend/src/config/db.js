require('dotenv').config();
const { Pool } = require('pg');

const dbConfig = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    }
  : {
      user: process.env.DB_USER || process.env.USER || 'postgres',
      host: process.env.DB_HOST || process.env.HOST,
      database: process.env.DB_NAME || process.env.DATABASE,
      password: process.env.DB_PASSWORD || process.env.PASSWORD,
      port: Number(process.env.DB_PORT || process.env.PGPORT || 5432),
      ssl: { rejectUnauthorized: false },
    };

const pool = new Pool(dbConfig);

pool.on('connect', () => {
  console.log('Terhubung ke Database Supabase (PostgreSQL)');
});

pool.on('error', (err) => {
  console.error('Koneksi database terputus:', err);
});

module.exports = pool;
