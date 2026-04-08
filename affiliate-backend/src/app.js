const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');

const app = express();

// Middleware
app.use(cors()); // Agar frontend bisa akses backend
app.use(express.json()); // Agar backend bisa baca format JSON

// Routing
app.use('/api/products', productRoutes);

// Error Handling Dasar
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Terjadi kesalahan pada server!' });
});

module.exports = app;