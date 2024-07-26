const express = require('express');
const router = express.Router();

// Tambahkan rute Anda di sini
router.get('/', (req, res) => {
  res.send('Pesanan');
});

module.exports = router;
