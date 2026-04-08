// src/middlewares/authMiddleware.js
require('dotenv').config();

const adminAuth = (req, res, next) => {
    // Mengambil key dari header bernama 'x-api-key'
    const apiKey = req.headers['x-api-key'];

    if (!apiKey || apiKey !== process.env.ADMIN_SECRET_KEY) {
        return res.status(403).json({ 
            message: "Akses ditolak! Anda tidak memiliki izin untuk melakukan aksi ini." 
        });
    }

    // Jika cocok, lanjut ke fungsi berikutnya (Controller)
    next();
};

module.exports = adminAuth;