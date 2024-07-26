const express = require('express');
const router = express.Router();
const { User } = require('../models/index'); // Pastikan impor model sudah benar
const { authenticate } = require('../middleware/auth'); // Middleware untuk otentikasi


// Endpoint untuk mendapatkan semua pengguna
router.get('/', async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (err) {
        next(err);
    }
});

// Endpoint untuk mendapatkan pengguna berdasarkan ID
router.get('/:id', async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        next(err);
    }
});

// Endpoint untuk membuat pengguna baru
router.post('/', async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (err) {
        next(err);
    }
});

// Endpoint untuk memperbarui pengguna berdasarkan ID
router.put('/:id', async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await user.update(req.body);
        res.json(user);
    } catch (err) {
        next(err);
    }
});

// Endpoint untuk menghapus pengguna berdasarkan ID
router.delete('/:id', async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await user.destroy();
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
