const express = require('express');
const router = express.Router();
const { Product } = require('../models/product');

// GET semua product
router.get('/', async (req, res, next) => {
  try {
    // Mendapatkan semua data product dari database
    const product = await getProduct;
    // Mengirimkan data product dalam format JSON sebagai respon
    res.json(products);
  } catch (error) {
    // Meneruskan error ke middleware error handler
    next(error);
  }
});

// POST product baru
router.post('/', async (req, res, next) => {
    const { id_produk, nama_produk, deskripsi, harga, kategori, rating, ulasan } = req.body; // Mendapatkan data product dari body request
    try {
      // Membuat data product baru di database
      const newProduct = await Product.create({
        id_produk,
        nama_produk,
        deskripsi,
        harga,
        kategori,
        rating,
        ulasan
      });
      // Mengirimkan data product baru dalam format JSON dengan status 201 (Created)
      res.status(201).json(newProduct);
    } catch (error) {
      // Meneruskan error ke middleware error handler
      next(error);
    }
  });

// PUT untuk memperbarui product berdasarkan id
router.put('/:id', async (req, res, next) => {
    const { id } = req.params; // Mendapatkan id dari parameter URL
    const { id_produk, nama_produk, deskripsi, harga, rating, ulasan } = req.body; // Mendapatkan data barang dari body request
    try {
      // Mencari ptoduct berdasarkan primary key (id)
      const product = await Product.findByPk(id);
      if (!product) {
        // Jika ptoduct tidak ditemukan, mengirimkan respon 404 (Not Found)
        return res.status(404).json({ message: 'Product tidak ditemukan' });
      }
      // Memperbarui data product di database
      await product.update({
        id_produk,
        nama_produk,
        deskripsi,
        harga,
        rating,
        ulasan
      });
// Mengirimkan data product yang telah diperbarui dalam format JSON sebagai respon
res.json(product);
} catch (error) {
  // Meneruskan error ke middleware error handler
  next(error);
}
});

// DELETE product berdasarkan id
router.delete('/:id', async (req, res, next) => {
    const { id } = req.params; // Mendapatkan id dari parameter URL
    try {
      // Mencari product berdasarkan primary key (id)
      const product = await Product.findByPk(id);
      if (!product) {
        // Jika product tidak ditemukan, mengirimkan respon 404 (Not Found)
        return res.status(404).json({ message: 'Product tidak ditemukan' });
      }
      // Menghapus data product dari database
      await product.destroy();
      // Mengirimkan pesan sukses dalam format JSON sebagai respon
      res.json({ message: 'Product berhasil dihapus' });
    } catch (error) {
      // Meneruskan error ke middleware error handler
      next(error);
    }
  });

module.exports = router;