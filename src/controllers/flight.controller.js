const Flight = require('../models/flight.model');

// 1. عرض كل الرحلات
exports.getAllFlights = async (req, res, next) => {
    try {
        const { origin, destination } = req.query;
        let filter = {};

        if (origin) filter.origin = origin;
        if (destination) filter.destination = destination;

        const flights = await Flight.find(filter).populate('origin destination');
        res.status(200).json({ status: 'success', data: flights });
    } catch (err) {
        next(err);
    }
};

// 2. إضافة رحلة جديدة (للأدمن)
exports.createFlight = async (req, res, next) => {
    try {
        const newFlight = await Flight.create(req.body);
        res.status(201).json({ status: 'success', data: newFlight });
    } catch (err) {
        next(err);
    }
};