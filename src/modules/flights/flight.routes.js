const express = require('express');
const router = express.Router();
const Flight = require('./flight.model');

// دي البوابة اللي بتعرض كل الرحلات في الفرونت إند
router.get('/', async (req, res) => {
    try {
        const flights = await Flight.find().populate('origin destination');
        res.json({ status: 'success', data: flights });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
});

module.exports = router;