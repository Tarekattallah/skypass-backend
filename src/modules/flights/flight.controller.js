const Flight = require('./flight.model');

// 1. عرض كل الرحلات واقدر اعمل بحث (فلتر بسيط)
exports.getAllFlights = async (req, res) => {
    try {
        const { origin, destination } = req.query;
        let filter = {};

        if (origin) filter.origin = origin;
        if (destination) filter.destination = destination;

        const flights = await Flight.find(filter).populate('origin destination');
        res.status(200).json({ status: 'success', data: flights });
    } catch (err) {
        res.status(400).json({ status: 'error', message: err.message });
    }
};
// 2. إضافة رحلة جديدة (للأدمن)
exports.createFlight = async (req, res) => {
    try {
        const newFlight = await Flight.create(req.body);
        res.status(201).json({ status: 'success', data: newFlight });
    } catch (err) {
        res.status(400).json({ status: 'error', message: err.message });
    }
};