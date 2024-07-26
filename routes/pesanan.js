const express = require('express');
const router = express.Router();
const pesananRoutes = require('./pesananRoutes'); // Pastikan path ini sesuai dengan lokasi file yang sebenarnya

router.use('/api/pesanan', pesananRoutes);

// Mengimpor model pesanan dari direktori models
const { pesanan } = require('../models/pesanan');

// Mengimpor middleware authenticate
const { authenticate, authorize } = require('../middleware/auth');
const Product = require('../models/product');

// GET semua pesanan
router.get('/', async (req, res, next) => {
  try {
    // Mendapatkan semua data pesanan dari database
    const pesanan = await pesanan.findAll();
    // Mengirimkan data pesanan dalam format JSON sebagai respon
    res.send(pesanan);
  } catch (error) {
    // Meneruskan error ke middleware error handler
    next(error);
  }
});

// POST pesanan baru
router.post('/', async (req, res, next) => {
    const { id_pesanan, id_pengguna, tanggal_pemesanan, totalHarga, daftarProduk, alamat, infoPembayaran } = req.body; // Mendapatkan data pesanan dari body request
    try {
      // Membuat data pesanan baru di database
      const newPesanan = await Pesanan.create({
        id_pesanan,
        id_pengguna,
        tanggal_pemesanan,
        totalHarga,
        daftarProduk,
        alamat,
        infoPembayaran
      });
      // Mengirimkan data pesanan baru dalam format JSON dengan status 201 (Created)
      res.status(201).json(newPesanan);
    } catch (error) {
      // Meneruskan error ke middleware error handler
      next(error);
    }
  });

// PUT untuk memperbarui pesanan berdasarkan id
router.put('/:id', async (req, res, next) => {
    const { id } = req.params; // Mendapatkan id dari parameter URL
    const { id_pesanan, id_pengguna, tanggal_pemesanan, totalHarga, daftarProduk, infoPembayaran } = req.body; // Mendapatkan data pesanan dari body request
    try {
      // Mencari pesanan berdasarkan primary key (id)
      const pesanan = await Pesanan.findByPk(id);
      if (!pesanan) {
        // Jika pesanan tidak ditemukan, mengirimkan respon 404 (Not Found)
        return res.status(404).json({ message: 'Pesanan tidak ditemukan' });
      }
      // Memperbarui data pesanan di database
      await pesanan.update({
        id_pesanan,
        id_pengguna,
        tanggal_pemesanan,
        totalHarga,
        daftarProduk,
        infoPembayaran
      });
// Mengirimkan data pesanan yang telah diperbarui dalam format JSON sebagai respon
res.json(pesanan);
} catch (error) {
  // Meneruskan error ke middleware error handler
  next(error);
}
});

// DELETE pesanan berdasarkan id
router.delete('/:id', async (req, res, next) => {
    const { id } = req.params; // Mendapatkan id dari parameter URL
    try {
      // Mencari pesanan berdasarkan primary key (id)
      const pesanan = await Pesanan.findByPk(id);
      if (!pesanan) {
        // Jika pesanan tidak ditemukan, mengirimkan respon 404 (Not Found)
        return res.status(404).json({ message: 'Pesanan tidak ditemukan' });
      }
      // Menghapus data pesanan dari database
      await pesanan.destroy();
      // Mengirimkan pesan sukses dalam format JSON sebagai respon
      res.json({ message: 'Pesanan berhasil dihapus' });
    } catch (error) {
      // Meneruskan error ke middleware error handler
      next(error);
    }
  });

module.exports = router;