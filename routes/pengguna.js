const express = require('express');
const router = express.Router();

// Mengimpor model pengguna dari direktori models
const { Pengguna } = require('../models/pengguna');

// Mengimpor middleware authenticate
const { authenticate } = require('../middleware/auth');

// GET semua pengguna
router.get('/', async (req, res, next) => {
  try {
    // Mendapatkan semua data pengguna dari database
    const pengguna = await Pengguna.findAll();
    // Mengirimkan data pengguna dalam format JSON sebagai respon
    res.json(pengguna);
  } catch (error) {
    // Meneruskan error ke middleware error handler
    next(error);
  }
});

// POST pengguna baru
router.post('/', async (req, res, next) => {
    const { id_pengguna, nama_lengkap, email, alamat, password, riwayatPesanan } = req.body; // Mendapatkan data pengguna dari body request
    try {
      // Membuat data pengguna baru di database
      const newPengguna = await Pengguna.create({
        id_pengguna,
        nama_lengkap,
        email,
        alamat,
        password,
        riwayatPesanan
      });
      // Mengirimkan data pengguna baru dalam format JSON dengan status 201 (Created)
      res.status(201).json(newPengguna);
    } catch (error) {
      // Meneruskan error ke middleware error handler
      next(error);
    }
  });

// PUT untuk memperbarui pengguna berdasarkan id
router.put('/:id', async (req, res, next) => {
    const { id } = req.params; // Mendapatkan id dari parameter URL
    const { id_pengguna, nama_lengkap, email, alamat, password, riwayatPesanan } = req.body; // Mendapatkan data pengguna dari body request
    try {
      // Mencari pengguna berdasarkan primary key (id)
      const pengguna = await Pengguna.findByPk(id);
      if (!pengguna) {
        // Jika pengguna tidak ditemukan, mengirimkan respon 404 (Not Found)
        return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
      }
      // Memperbarui data pengguna di database
      await pengguna.update({
        id_pengguna,
        nama_lengkap,
        email,
        alamat,
        password,
        riwayatPesanan
      });
// Mengirimkan data pengguna yang telah diperbarui dalam format JSON sebagai respon
res.json(pengguna);
} catch (error) {
  // Meneruskan error ke middleware error handler
  next(error);
}
});

// DELETE pengguna berdasarkan id
router.delete('/:id', async (req, res, next) => {
    const { id } = req.params; // Mendapatkan id dari parameter URL
    try {
      // Mencari pengguna berdasarkan primary key (id)
      const pengguna = await Pengguna.findByPk(id);
      if (!pengguna) {
        // Jika pengguna tidak ditemukan, mengirimkan respon 404 (Not Found)
        return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
      }
      // Menghapus data pengguna dari database
      await pengguna.destroy();
      // Mengirimkan pesan sukses dalam format JSON sebagai respon
      res.json({ message: 'Pengguna berhasil dihapus' });
    } catch (error) {
      // Meneruskafn error ke middleware error handler
      next(error);
    }
  });

module.exports = router;
// Data produk yang akan kita tampilkan
const product = [
 { id_pengguna: 1, nama_lengkap: 'irawati', email: 'irawati@gmail.com', alamat: 'perumnas', password: 'ira123', riwayatPesanan: 'sepatu'  },
 { id_pengguna: 2, nama_lengkap: 'fitriani', email: 'fitri@gmail.com', alamat:'bantul', password: 'bismillah', riwayatPesanan: 'acesoriess'  },
 { id_pengguna: 3, nama_lengkap: 'fayruziah', email: 'puput@gmail.com', alamat:'flores', password: 'sudahlama', riwayatPesanan: 'baju'  },
];
// Rute GET untuk mendapatkan daftar produk
router.get('/', function(req, res, next) {
 res.json(product);
});

router.post('/', function(req, res, next) {
    const newProduct = {
        id_pengguna: product.length + 1,
        nama_lengkap: req.body.nama_lengkap,
        email: req.body.email,
        alamat: req.body.alamat,
        password: req.body.password,
        riwayatPesanan: req.body.riwayatPesanan,
        };
    res.json(newProduct);
});

module.exports = router;