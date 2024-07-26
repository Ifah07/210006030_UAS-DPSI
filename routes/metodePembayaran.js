const express = require('express');
const router = express.Router();
const db = require('../models');

// Get all metodePembayaran
router.get('/', async (req, res) => {
    try {
        const orders = await db.metodePembayaran.findAll();
        res.json(metodePembayaran);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get metodePembayaran by ID
router.get('/:id', async (req, res) => {
    try {
        const metodePembayaran = await db.metodePembayaran.findByPk(req.params.id);
        if (metodePembayaran) {
            res.json(metodePembayaran);
        } else {
            res.status(404).json({ error: 'metodePembayaran not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create new metodePembayaran
router.post('/', async (req, res) => {
    try {
        const metodePembayaran = await db.metodePembayaran.create(req.body);
        res.status(201).json(metodePembayaran);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
