const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const adminAuth = require('../middlewares/authMiddleware');

// URL: GET /api/products
router.get('/', productController.getAllProducts);

// URL: POST /api/products
router.post('/',adminAuth, productController.createProduct);

// URL: PUT /api/products/:id (Update)
router.put('/:id', adminAuth, productController.updateProduct);

// URL: DELETE /api/products/:id (Delete)
router.delete('/:id', adminAuth, productController.deleteProduct);

module.exports = router;