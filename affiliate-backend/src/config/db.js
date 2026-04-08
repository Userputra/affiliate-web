const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const { Pool } = require('pg');

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false // Diperlukan agar bisa terhubung ke cloud database Supabase
//   }
// });
const pool = new Pool({
  user: 'postgres',
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD, // Langsung tulis apa adanya
  port: process.env.PORT || 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

pool.on('connect', () => {
  console.log('Terhubung ke Database Supabase (PostgreSQL)');
});

pool.on('error', (err) => {
  console.error('Koneksi database terputus:', err);
});

console.log("Cek DATABASE_URL:", process.env.HOST, process.env.DATABASE, process.env.PASSWORD, process.env.PORT);

module.exports = pool;