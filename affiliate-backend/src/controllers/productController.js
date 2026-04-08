const pool = require('../config/db');

// Mengambil semua produk untuk ditampilkan di web
const getAllProducts = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products ORDER BY created_at DESC');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil produk", error: error.message });
    }
};

// Menambahkan produk baru (Input dari Admin)
const createProduct = async (req, res) => {
    const { name, price_original, price_discount, image_url, affiliate_link, source_marketplace, category } = req.body;
    
    try {
        const query = `
            INSERT INTO products (name, price_original, price_discount, image_url, affiliate_link, source_marketplace, category)
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
        
        const values = [name, price_original, price_discount, image_url, affiliate_link, source_marketplace, category];
        const result = await pool.query(query, values);
        
        res.status(201).json({
            message: "Produk berhasil ditambahkan ke Supabase!",
            data: result.rows[0]
        });
    } catch (error) {
        res.status(500).json({ message: "Gagal menambah produk", error: error.message });
    }
};

// Menghapus Produk
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
        
        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Produk tidak ditemukan" });
        }
        
        res.status(200).json({ message: "Produk berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ message: "Gagal menghapus produk", error: error.message });
    }
};

// Mengupdate Produk
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price_original, price_discount, image_url, affiliate_link, category } = req.body;
    
    try {
        const query = `
            UPDATE products 
            SET name = $1, price_original = $2, price_discount = $3, image_url = $4, affiliate_link = $5, category = $6, updated_at = NOW()
            WHERE id = $7 RETURNING *`;
        
        const values = [name, price_original, price_discount, image_url, affiliate_link, category, id];
        const result = await pool.query(query, values);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Produk tidak ditemukan" });
        }

        res.status(200).json({ message: "Produk berhasil diupdate", data: result.rows[0] });
    } catch (error) {
        res.status(500).json({ message: "Gagal mengupdate produk", error: error.message });
    }
};

// Jangan lupa export fungsi baru ini
module.exports = {
    getAllProducts,
    createProduct,
    deleteProduct,
    updateProduct
};