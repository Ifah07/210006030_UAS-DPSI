const express = require('express');
const router = express.Router();
const productRouter = require('./product');
const penggunaRouter = require('./pengguna');
const pesanan = require('./pesanan');
const metodePembayaranRouter = require('./metodePembayaran');
const ulasanRouter = require('./ulasan');

router.use('/product', productRouter);
router.use('/pengguna', penggunaRouter);
router.use('/pesanan', pesanan);
router.use('/metodePembayaran', metodePembayaranRouter);
router.use('/api/ulasan', ulasanRouter);

module.exports = router;
