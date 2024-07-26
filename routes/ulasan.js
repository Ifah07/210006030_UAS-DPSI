const express = require('express');
const router = express.Router();
const Ulasan = require('../models/ulasan'); // Pastikan path ini benar

// Mengimpor middleware authenticate
const { authenticate, authorize } = require('../middleware/auth');

// GET semua ulasan
router.get('/', async (req, res) => {
  try {
    // Mendapatkan semua data ulasan dari database
    const ulasan = await Ulasan.findAll();
    // Mengirimkan data ulasan dalam format JSON sebagai respon
    res.json(ulasan);
  } catch (error) {
    res.status(500).json({ error: error.message });
    // Meneruskan error ke middleware error handler
  }
});

// POST ulasan baru
router.post('/', async (req, res, next) => {
    const { id_ulasan, id_produk, ratting, isi_ulasan } = req.body; // Mendapatkan data ulasan dari body request
    try {
      // Membuat data ulasan baru di database
      const newUlasan = await Ulasan.create({
        id_ulasan,
        id_produk,
        ratting,
        isi_ulasan
      });
      // Mengirimkan data ulasan baru dalam format JSON dengan status 201 (Created)
      res.status(201).json(newUlasan);
    } catch (error) {
      // Meneruskan error ke middleware error handler
      next(error);
    }
  });

// PUT untuk memperbarui ulasan berdasarkan id
router.put('/:id', async (req, res, next) => {
    const { id } = req.params; // Mendapatkan id dari parameter URL
    const { id_ulasan, id_produk, ratting, isi_ulasan } = req.body; // Mendapatkan data ulasan dari body request
    try {
      // Mencari ulasan berdasarkan primary key (id)
      const ulasan = await Ulasan.findByPk(id);
      if (!ulasan) {
        // Jika ulasan tidak ditemukan, mengirimkan respon 404 (Not Found)
        return res.status(404).json({ message: 'Ulasan tidak ditemukan' });
      }
      // Memperbarui data ulasan di database
      await ulasan.update({
        id_ulasan,
        id_produk,
        ratting,
        isi_ulasan
      });
      // Mengirimkan data ulasan yang telah diperbarui dalam format JSON sebagai respon
      res.json(ulasan);
    } catch (error) {
      // Meneruskan error ke middleware error handler
      next(error);
    }
});

// DELETE ulasan berdasarkan id
router.delete('/:id', async (req, res, next) => {
    const { id } = req.params; // Mendapatkan id dari parameter URL
    try {
      // Mencari ulasan berdasarkan primary key (id)
      const ulasan = await Ulasan.findByPk(id);
      if (!ulasan) {
        // Jika ulasan tidak ditemukan, mengirimkan respon 404 (Not Found)
        return res.status(404).json({ message: 'Ulasan tidak ditemukan' });
      }
      // Menghapus data ulasan dari database
      await ulasan.destroy();
      // Mengirimkan pesan sukses dalam format JSON sebagai respon
      res.json({ message: 'Ulasan berhasil dihapus' });
    } catch (error) {
      // Meneruskan error ke middleware error handler
      next(error);
    }
});

module.exports = router;
